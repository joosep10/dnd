const howEarly = (s, query) => {
  let x = 1000;
  let idx = 0;
  for (let i = 0; i < query.length; i++) {
    idx = s.indexOf(query[i], idx);
    x += idx;
  }
  return x;
};
const rank = (spell, query) => {
  let s = spell.name.toLowerCase();
  let x = 0;
  if (s.includes(query)) {
    x += s.indexOf(query);
  } else x = howEarly(s, query);
  return x;
};
export const mySort = (spells, query) => {
  return spells.sort((a, b) => rank(a, query) - rank(b, query));
};

export const fuzzyTestMatch = (str, query) => {
  if (/^[a-zA-Z\s]*$/.test(query)) {
    const regex = new RegExp(query.split('').join('.*'));
    return regex.test(str);
  } else {
    return false;
  }
};
