/**
 * @author Desarrollo
 */



function test_first_param(){
	var args = Array.prototype.slice.call(arguments, 1);
	console.log(args[1]);
}



window.onReady(function() {
  test_first_param("first", "second", "third");
});
