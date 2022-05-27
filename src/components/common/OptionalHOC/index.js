const OptionalHOC = ({ Component, children, ...props }) => {
  console.log(props);
  if (!props.url) return <>{children}</>;

  return <Component {...props}>{children}</Component>;
};

export default OptionalHOC;
