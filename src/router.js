export default {
  match: (re) => {
    return re.test(window.location.pathname);
  },
  param: (re, name) => {
    const match = re.exec(window.location.pathname);
    return match && match.groups && match.groups[name];
  },
  query: () => {
    // return object with all params
  }
}
