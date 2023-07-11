figma.showUI(__html__);

figma.ui.resize(500,500);

figma.ui.onmessage = pluginMessage => {
    console.log("Checking if VSCode is watching...");

    if (pluginMessage.darkModeState === true) {
        // thing
    }
    else {
        // other
    }

    figma.closePlugin();
}

