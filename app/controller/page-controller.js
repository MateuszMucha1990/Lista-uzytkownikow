class PageController {
    home(req, res) {
        // wyrenderuj stronę główną
        res.render('pages/home', {
          title:'Strona Głowna',
          //url:req.url
        });
      }

    kontakty(req, res)  {
        // wyrenderuj stronę kontaktu
        res.render('pages/kontakt',{
          title:'Kontakty',
          //url:req.url
        });
      } 
    
    notFound(req, res)  {
        // wyrenderuj stronę 404
        res.render('errors/404',{
        title:'404',
        layout:'layouts/mini',
        //url:req.url 
      })
      }  
}
module.exports = new PageController(); //new instancja, zeby wejsc w web.js