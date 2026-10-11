<?php
$p='/var/www/html/bootstrap/app.php';
$s=file_get_contents($p);
if(!str_contains($s,"api: __DIR__")){
    $s=str_replace("web: __DIR__.'/../routes/web.php',", "web: __DIR__.'/../routes/web.php',\n        api: __DIR__.'/../routes/api.php',",$s);
    file_put_contents($p,$s);
}
$p='/var/www/html/bootstrap/providers.php';
$a=require $p;
$v=App\Providers\Filament\AdminPanelProvider::class;
if(!in_array($v,$a,true)){$a[]=$v;file_put_contents($p,"<?php\n\nreturn [\n".implode('',array_map(fn($x)=>"    ".$x."::class,\n",$a))."];\n");}
