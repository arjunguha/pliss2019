let saved = "nothing";
function handler(k) {
  saved = k;
  saved("Start");
}

console.log(control(handler));
if (i < 3) {
  i = i + 1;
  saved(i);
}