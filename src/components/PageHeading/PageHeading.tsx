import type { PageHeadingProps } from './PageHeading.types';

export const PageHeading: React.FC<
  React.PropsWithChildren<PageHeadingProps>
> = ({ title, children }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 pb-3">{title}</h1>
      {children ? <div>{children}</div> : null}
    </div>
  );
};
