figma.showUI(__html__);

figma.ui.resize(500,500);

figma.ui.onmessage = pluginMessage => {

    const postComponents = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;

    // root tells the code to look through the figma document
    // the node => syntax just lets us narrow down on what node we want to select by using the selectors
    // as ComponentSetNode helps in the translation of TS to JS since JS may interpret postComponents as a different node type, possibly

    const defVariant = postComponents.defaultVariant;
    const defDark = postComponents.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=none, Dark mode=true") as ComponentNode;
    const singleVariant = postComponents.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=single, Dark mode=false") as ComponentNode;
    const singleDark = postComponents.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=single, Dark mode=true") as ComponentNode;
    const carouselVariant = postComponents.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
    const carouselDark = postComponents.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;

    if (pluginMessage.darkModeState === true) {
        switch (pluginMessage.imageVariant) {
            case "1": // default
                defDark.createInstance();
                break;
            case "2": // single
                singleDark.createInstance();
                break;
            case "3": // carousel
                carouselDark.createInstance();
                break;
            default:
                break;
        }
    }
    else {
        switch (pluginMessage.imageVariant) {
            case "1": // default
                defVariant.createInstance();
                break;
            case "2": // single
                singleVariant.createInstance();
                break;
            case "3": // carousel
                carouselVariant.createInstance();
                break;
            default:
                break;
        }        
    }

    figma.closePlugin();
}

