<?php 
ini_set('display_errors', 'on');
error_reporting(E_ALL);


$xdesp = -327;
$ydesp = -372;


function ctxxmoveTo($x, $y){
	global $xdesp, $ydesp;
	echo "ctxxmoveTo(". ($x + $xdesp) .", ". ($y + $ydesp) .");\n";
}

function ctxxlineTo($x, $y){
	global $xdesp, $ydesp;
	echo "ctxxlineTo(". ($x + $xdesp) .", ". ($y + $ydesp) .");\n";
}

function ctxxclosePath(){
	echo "ctxxclosePath();\n";
}


		ctxxmoveTo(3543,1787);
		ctxxlineTo(4957,3201);
		ctxxlineTo(4250,3908);
		ctxxlineTo(3826,3484);
		ctxxlineTo(4109,3201);
		ctxxlineTo(3543,2635);
		ctxxlineTo(2977,3201);
		ctxxlineTo(3261,3485);
		ctxxlineTo(2837,3909);
		ctxxlineTo(2129,3201);
		ctxxlineTo(3543,1787);
		ctxxclosePath();
		
		ctxxmoveTo(728,778);
		ctxxlineTo(3132,377);
		ctxxlineTo(327,3182);
		ctxxlineTo(728,778);
		ctxxclosePath();
		
		ctxxmoveTo(1274,4789);
		ctxxlineTo(3557,6425);
		ctxxlineTo(5813,4808);
		ctxxlineTo(3553,7068);
		ctxxlineTo(1274,4789);
		ctxxclosePath();
		
		ctxxmoveTo(3862,377);
		ctxxlineTo(7059,377);
		ctxxlineTo(7059,3612);
		ctxxlineTo(6602,840);
		ctxxlineTo(3863,377);
		ctxxclosePath();
		
		ctxxmoveTo(4397,783);
		ctxxlineTo(6336,1106);
		ctxxlineTo(6659,3045);
		ctxxlineTo(4396,782);
		ctxxclosePath();
		
		ctxxmoveTo(3544,372);
		ctxxlineTo(4039,867);
		ctxxlineTo(1706,3200);
		ctxxlineTo(3544,5038);
		ctxxlineTo(5382,3200);
		ctxxlineTo(4167,1985);
		ctxxlineTo(4662,1490);
		ctxxlineTo(6372,3200);
		ctxxlineTo(3544,6028);
		ctxxlineTo(716,3200);
		ctxxlineTo(3544,372);
		ctxxclosePath();
		
?>