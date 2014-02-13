<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">

  <!-- JQuery Library -->
  <!-- <script type="text/javascript" src="lib/jquery.min.1.10.2.js"></script> -->
  
  <!-- melonJS Library -->
  <script type="text/javascript" src="lib/melonJS-0.9.11.js"></script>
  <!-- <script type="text/javascript" src="lib/melonJS-0.9.11-min.js"></script> -->

  <!-- Plugin(s) -->
  <!-- <script type="text/javascript" src="lib/plugins/debugPanel.js"></script> -->

  <!-- Game Scripts -->
  <script type="text/javascript" src="scr/commons.js"></script>
  <script type="text/javascript" src="scr/game.js"></script>
  <script type="text/javascript" src="scr/resources.js"></script>

  <script type="text/javascript" src="scr/entities/player.js"></script>
  <script type="text/javascript" src="scr/entities/HUD.js"></script>

  <script type="text/javascript" src="scr/screens/title.js"></script>
  <script type="text/javascript" src="scr/screens/play.js"></script>  
  <script type="text/javascript" src="scr/screens/loadingscreen.js"></script>  
  <script type="text/javascript" src="scr/screens/loadingbar.js"></script>  
  
  <script type="text/javascript" src="scr/components/directionkeyscontroller.js"></script>
  <script type="text/javascript" src="scr/components/imovecontroller.js"></script>
  <script type="text/javascript" src="scr/components/examovecontroller.js"></script>
  <script type="text/javascript" src="scr/components/directionspritecontroller.js"></script>
  <script type="text/javascript" src="scr/components/shootingspritecontroller.js"></script>
  
  <script type="text/javascript" src="scr/rendereables/background.js"></script>

  <link  href="style/general-style.css" rel="stylesheet">
 
  <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->

</head>
<body> 

  <h2>MelonJS's Example</h2>
  <div id="MelonJSxample" oncontextmenu="return false;"></div>  	

  <p>It is a simple example of MelonJS game framework.</p>
  

  <p class="controls">Controls: Use W, A, S, and D or arrow keys to move around.</p>

  <!-- <input type="button" value="iniciar" onclick="javascript:game.onload();" /> -->

</body>
</html>