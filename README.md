# El Impostor Futbolero — versión estable gratuita

Esta edición no usa Cloud Functions, Cloud Build ni el plan Blaze. Se puede mantener en Firebase Spark (gratis) y GitHub Pages.

## Mejoras incluidas

- Todos los teléfonos observan la misma fase: sala, reparto de roles, debate, votación, resultado o revelación.
- El reloj toma como referencia la hora de Firebase; al llegar a cero, cualquier celular conectado abre una única votación compartida.
- Cada voto se guarda una sola vez por jugador y los empates se resuelven de forma ordenada.
- Si alguien se ausenta durante la votación, el anfitrión puede omitirlo luego de 30 segundos y no bloquea la partida.
- El primer invitado queda como respaldo si el anfitrión desaparece más de 45 segundos.
- Los roles se guardan en rutas separadas: cada jugador solo lee su propia carta. El anfitrión conserva la información necesaria para cerrar una ronda.
- El caché de la PWA se actualizó para que no se mezclen versiones viejas del juego.
- Catálogo ampliado a 558 futbolistas y futbolistas históricas.

## Configuración de Firebase (una sola vez)

1. En Firebase Console abre **Authentication → Sign-in method** y activa **Anonymous**.
2. Desde esta carpeta, donde ya hiciste `firebase use`, ejecuta exactamente:

   ```powershell
   firebase deploy --only database
   ```

   Esto solamente publica las reglas de Realtime Database. No pide Blaze ni publica Functions.

3. Sube a GitHub Pages estos archivos: `index.html`, `online.js`, `players.js`, `firebase-config.js`, `manifest.json`, `sw.js` y la carpeta `icons` que ya tenías en tu juego.

No subas `database.rules.json`, `firebase.json`, `.firebaserc` ni este README a GitHub Pages.

## Limitación honesta de una arquitectura gratuita

Las reglas y Authentication evitan errores casuales y separan la carta de cada participante. Sin un servidor propio, Firebase no puede impedir por completo que alguien con conocimientos técnicos manipule su navegador o que el anfitrión intente hacer trampa. Para un grupo de amigos esto suele ser suficiente; la versión con Functions era la opción para seguridad y anti-trampa de nivel servidor.

## Prueba recomendada

Antes de jugar una partida real, abre la app con 4 a 7 teléfonos. Comprueba el flujo completo: reparto de cartas, cronómetro, votación, empate y salida de un participante. Luego instala/recarga la PWA una vez para asegurar que todos tienen la versión nueva.
