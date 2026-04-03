@echo off
echo =======================================================
echo VITAL PRO - FULL GITHUB SYNC (FIXING VERCEL FILES)
echo =======================================================
echo Guardando todos los cambios y archivos nuevos locales...
git add .
git commit -m "chore: full sync of missing configs and UI updates for Vercel build"
echo Empujando estructura completa a Github...
git push
echo.
echo =======================================================
echo PROCESO FINALIZADO. VERIFICA VERCEL PARA VER EL DESPLIEGUE COMPLETO.
echo =======================================================
pause
