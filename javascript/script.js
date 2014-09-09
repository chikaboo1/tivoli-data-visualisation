
//function the returns all the reviews with the given keywords
function findReviews(expression) {
  return reviews.collection1.filter(function(each){
    return each.description.match(expression);
    });
}

//function that counts how many times a given keyword appears in total
function findKeyword (expression){
  var total = [];
  //go through each review from json file
  for (var i = 0; i < reviews.collection1.length; i ++){
    //if the description contains the ketyword
    if (reviews.collection1[i].description.match(expression) !== null){
      //each time the keyword appears put it in an array
      var one = reviews.collection1[i].description.match(expression);
      //merge this array with the total count array
      total.push.apply(total, one);
    };
  }
  return total.length;
}

//function that gets all the reviews based on a star
function starRatingReview (reviews, star) {
	var expression = new RegExp(star);

	return reviews.filter(function(each){
		return each.rating.match(expression) !== null;
	});
}


var button = document.getElementById("theButton");
var searchdiv = document.getElementById("search-wrapper")
button.onclick = function(e) {
	e.preventDefault();
	 var value =  button.form.valueId.value;
	 var expression = new RegExp(value, 'i');
   var reviews = findReviews(expression);
   var keyword = [
   	starRatingReview(reviews, 1),
   	starRatingReview(reviews, 2),
   	starRatingReview(reviews, 3),
   	starRatingReview(reviews, 4),
   	starRatingReview(reviews, 5),
   ];
   console.log(reviews);

   // d3.select('body').append('ul')
   //    .selectAll('ul')
   //    .data(keyword)
   //    .enter()
   //    .append('li')
   //    .text(function(d){return d.length});

//adding title
var valueHeading = document.createElement("h1");
var node = document.createTextNode("You searched: " + value);
valueHeading.appendChild(node);
var element = document.getElementById("rating-list");
element.appendChild(valueHeading);


   d3.select('#rating-list').append('ul')
      .selectAll('ul')
      .data(keyword)
      .enter()
      .append('li')
      .text(function(a){
        return a.length + " reviews";
      })
      .style('height', function(a){
      	if (a.length === 0){
      		return 0;
      	} else{

      	return (a.length/20) + 'em';}})
      .style('background', 'blue');

      searchdiv.style.opacity = 0;
      console.log(searchdiv);
}

