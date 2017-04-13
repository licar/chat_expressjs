/**
 * Created by user on 14.04.2017.
 */
router.get('/chat', function(req, res, next) {
    if (!req.session.user){
        res.redirect('/')
    }else{
        res.render('chat', { title: 'Express' });
    }
    res.end();
});