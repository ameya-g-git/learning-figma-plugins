figma.showUI(__html__);

figma.ui.resize(500,500);

figma.ui.onmessage = pluginMessage => {


    const loadFonts = async() => {
        await figma.loadFontAsync({ family: "Rubik", style: "Regular" });
    }

    loadFonts().then(() => {
        const postComponents = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;

        // root tells the code to look through the figma document
        // the node => syntax just lets us narrow down on what node we want to select by using the selectors
        // as ComponentSetNode helps in the translation of TS to JS since JS may interpret postComponents as a different node type, possibly
    
        const defVariant = postComponents.defaultVariant as ComponentNode;
        const defDark = postComponents.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=none, Dark mode=true") as ComponentNode;
        const singleVariant = postComponents.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=single, Dark mode=false") as ComponentNode;
        const singleDark = postComponents.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=single, Dark mode=true") as ComponentNode;
        const carouselVariant = postComponents.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
        const carouselDark = postComponents.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
    
        let postTemplate; // to save the new component instance in a variable, for later reference + editing the data in the component
    
        if (pluginMessage.darkModeState === true) {
            switch (pluginMessage.imageVariant) {
                case "1":
                    postTemplate = defDark.createInstance() as InstanceNode;
                    break;
                case "2": // single
                    postTemplate = singleDark.createInstance() as InstanceNode; 
                    break;
                case "3": // carousel
                    postTemplate = carouselDark.createInstance() as InstanceNode;
                    break;
                default:
                    postTemplate = defDark.createInstance() as InstanceNode;
                    break;
            }
        }
        else {
            switch (pluginMessage.imageVariant) {
                case "1":
                    postTemplate = defVariant.createInstance() as InstanceNode;
                    break;
                case "2": // single
                    postTemplate = singleVariant.createInstance() as InstanceNode;
                    break;
                case "3": // carousel
                    postTemplate = carouselVariant.createInstance() as InstanceNode;
                    break;
                default:
                    postTemplate = defVariant.createInstance() as InstanceNode;
                    break;
            }        
        }
    
        const tempName = postTemplate.findOne(node => node.type == "TEXT" && node.name == "displayName") as TextNode;
        const tempUsername = postTemplate.findOne(node => node.type == "TEXT" && node.name == "@username") as TextNode;
        const tempDesc = postTemplate.findOne(node => node.type == "TEXT" && node.name == "description") as TextNode;
    
        tempName.characters = pluginMessage.name; // .characters allows us to change the text in the node, the characters 
        tempUsername.characters = pluginMessage.username;
        tempDesc.characters = pluginMessage.desc;
    
     
    
        figma.closePlugin();
    })
    
    
};

