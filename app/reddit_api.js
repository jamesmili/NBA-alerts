$.getJSON(
  "http://www.reddit.com/r/nba/new.json?sort=new&t=hour",
  function foo(data)
  {
    $.each(
      data.data.children.slice(0, 10),
      function (i, post) {
        $("#reddit-content").append( '<br>' + post.data.title );
      }
    )
  }
)
