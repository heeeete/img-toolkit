import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('image-compress', 'routes/image-compress/index.tsx'),
  route('image-format-conversion', 'routes/image-format-conversion/index.tsx'),
  route('remove-bg', 'routes/remove-bg/index.tsx'),

  // * APIs
  ...prefix('api', [route('todo', 'routes/apis/todo.ts')]),
] satisfies RouteConfig;
