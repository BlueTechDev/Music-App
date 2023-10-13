const installButton = document.getElementById('install-button');

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser install prompt
  event.preventDefault();
  
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    event.prompt();
    event.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
        installButton.style.display = 'none';
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    });
  });
});
