const t = "hello";
const function_1 = (param) => {
  console.log("1" + param + t);
};

const function_2 = (param2) => {
  console.log(param2 + t);
};

const function_hoc = (callback) => {
  callback("123");
};

// function_1("abc");
// function_2("xyz");
// function_hoc(function_1);

const Component = (props) => {
  return console.log("JSX" + props);
};

const hoc = (Component) => (props) => {
  const t = "abc";
  return <Component {...props} t={t} />;
};
