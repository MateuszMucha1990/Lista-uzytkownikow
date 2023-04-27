// 1. Przygotuj widoki dla poniższej strony:
// Założenia:
// - użyj systemu szablonów EJS     done
// - widoki trzymaj w folderze 'views'    done
// - przygotuj pliki 'header' i 'footer'
// - przygotuj layout o nazwie 'main'   done
// - przygotuj widoki 'home', 'contact', 'user'  done
// - pliki widoku trzymaj odpowiednia w folderach: partials, pages, layouts, errors   done
// - przygotuj plik CSS i wczytaj go w headerze; umieść w nim proste stylowanie aby mieć pewność, że działa done
// - przygotuj plik JS i wczytaj go w stopce; umieść w nim console.log('Skrypty załadowane') aby mieć pewność, że działa
// - wstać przynajmniej 1 zdjęcie na stronę
// - pliki css, js i zdjęcia umieść odpowiedni w folderzach: css, js, img

//uruchomienie servera
const app = require('./app.js')
const {port}=require('./config');


app.listen(port, () => {
  console.log(`serwer uruchomiony na porcie: ${port}`);
});