# api/remove_bg.py

from http.server import BaseHTTPRequestHandler
import io
import os
import cgi
from rembg import remove, new_session

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # 1) Content-Type 헤더 확인 (multipart/form-data여야 함)
        content_type = self.headers.get("Content-Type", "")
        if not content_type.startswith("multipart/form-data"):
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"error":"Invalid Content-Type"}')
            return

        # 2) cgi 모듈로 multipart/form-data 파싱
        #    cgi.FieldStorage를 사용하면 boundary와 Content-Length를 자동으로 처리해준다.
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={
                'REQUEST_METHOD': 'POST',
                'CONTENT_TYPE': content_type,
            }
        )

        # 3) "image" 필드가 있는지 확인
        if "image" not in form or not form["image"].file:
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"error":"No image file provided"}')
            return

        fileitem = form["image"]
        original_filename = os.path.basename(fileitem.filename or "")
        if original_filename == "":
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"error":"No selected file"}')
            return

        # 4) 업로드된 파일 바이트 읽기
        try:
            img_bytes = fileitem.file.read()
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            err = f'{{"error":"Failed to read image bytes: {str(e)}"}}'
            self.wfile.write(err.encode("utf-8"))
            return

        # 5) rembg로 배경 제거
        model_name = "isnet-general-use"
        try:
            session = new_session(model_name)
            result_bytes = remove(img_bytes, session=session)
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            err = f'{{"error":"Failed to process image: {str(e)}"}}'
            self.wfile.write(err.encode("utf-8"))
            return

        # 6) 제거된 PNG 바이트를 BytesIO로 감싸기
        buf = io.BytesIO(result_bytes)
        buf.seek(0)

        # 7) 다운로드 파일명 지정 (원본 확장자를 떼고 .png)
        name, _ = os.path.splitext(original_filename)
        download_name = f"{name}.png"

        # 8) 응답 헤더 작성 후 바이트 전송
        self.send_response(200)
        self.send_header("Content-Type", "image/png")
        self.send_header("Content-Disposition", f'attachment; filename="{download_name}"')
        self.end_headers()
        self.wfile.write(buf.read())


# (주의) 아래 코드는 Vercel Functions에서는 실행되지 않습니다.
# 로컬에서 이 파일만 테스트하고 싶다면 별도 HTTP 서버를 띄워야 합니다.
if __name__ == "__main__":
    from http.server import HTTPServer
    print("Running locally at http://localhost:8000")
    server = HTTPServer(("0.0.0.0", 8000), handler)
    server.serve_forever()
