export const fetchGiphy = () => {
  return new Promise((success, error) => {
    const defaults = {
      method: 'get',
      url: `http://api.giphy.com/v1/gifs?api_key=dc6zaTOxFJmzC&limit=2&ids=DKnMqdm9i980E`,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {},
      dataType: 'jsonp'
    };

   const xhr = new XMLHttpRequest();
    xhr.open(defaults.method, defaults.url);
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        success(JSON.parse(xhr.response));
      } else {
        error(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  });
};
