export const fetchGiphy = () => (
  $.ajax({
    method: "GET",
    url: `http://api.giphy.com/v1/gifs?api_key=dc6zaTOxFJmzC&limit=2&ids=DKnMqdm9i980E`
  })
);
