# Highlight new results in AO3 search

- in the search results page, if it's the first page, store the results
- if the identical query is submitted, highlight works not in the stored results
- also works for pages beyond the first

# Known bugs

- uses localstorage, so no sync between devices
- will inflate localstorage over long enough time, so it needs clearing
- can work weird for works not sorted by some kind of date
- will highlight works sufficiently older than the stored ones as "new" too

# Possible improvements

- some way to clear data, or alternatively manual addition of searches
