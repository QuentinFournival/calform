
    
    const openProfil = document.querySelector('.profil');
    openProfil.addEventListener('click', openProf);
    function openProf(){
        const isOpen = document.querySelector('.pop-up-profil');
        isOpen.classList.add('active-menu-profil');
    }

    const closeProfil = document.querySelector('.profil-close');
    closeProfil.addEventListener('click', closeProf);
    function closeProf(){
        const isClose = document.querySelector('.pop-up-profil');
        isClose.classList.remove('active-menu-profil');
    }
   
   
   