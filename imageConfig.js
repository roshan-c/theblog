const imageConfig = {
    // Destiny related images
    'pantheon-riven': 'images/destiny/pantheonriven.png',
    'afk-warning': 'images/destiny/afkwarning.png',
    'tonics-screen': 'images/destiny/tonics.avif',
    'reddit-top': 'images/destiny/toppagereddit.png',
    
    // TMZ article images
    'gart-dead': 'images/tmz/gart (720).png',
    'overdeliver': 'images/tmz/overdeliver (720).png',
    
    // Tierlist images 
    'tierlist-full': 'images/tierlist/tierlist2x.png',
    'tierlist-reason': 'images/tierlist/thereason.png'
};

function getImagePath(nickname) {
    const path = imageConfig[nickname];
    if (!path) {
        console.error(`Image nickname "${nickname}" not found in config`);
        return '';
    }
    return path;
}