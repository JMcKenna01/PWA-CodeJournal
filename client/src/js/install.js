const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update UI to show the install button
    butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
    // Hide the install button because it can't be clicked twice
    butInstall.style.display = 'none';

    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, discard it
    deferredPrompt = null;
});

window.addEventListener('appinstalled', (event) => {
    // App was installed, do something
    console.log('PWA was succesfully installed!');
    
});
