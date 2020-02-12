const getEmptystate = (provider, props) => {
  if (provider.requestFailedMessage()) {
    return provider.requestFailedMessage();
  }

  const base = props.emptystate;
  const query = provider.getQuery();
  if (query) {
    return `${base} for : ${query}`;
  }

  return base;
};

export default getEmptystate;
