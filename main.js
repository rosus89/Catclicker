(() => {
let cats = [
    { name: "Fluffy", src: "images/cat_picture1.jpg" },
    { name: "Puffy", src: "images/cat_picture2.jpeg" },
    { name: "Muffy", src: "images/cat_picture3.jpeg" }
];



// model
let model = {
    Cat:class {
            constructor(name, src) {
                this.name = name;
                this.src = src;
                this.clicks = 0;
        }
    },
    cats: [],
    thisCat: {},
    adminOpen: false
};

// view
let view = {
    init: function() {
        // cat buttons and view
        this.buttons =  document.querySelector("#buttons");
        this.catName = document.querySelector(".cat-name");
        this.catImage = document.querySelector(".cat-image");
        this.clicks =  document.querySelector(".clicks");

        // update Cat form
        this.newCatName = document.querySelector(".new-cat-name");
        this.newCatSrc = document.querySelector(".new-cat-src");
        this.newCatClicks = document.querySelector(".new-cat-clicks");
        this.adminForm = document.querySelector(".admin");
        //buttons update cat
        this.admin = document.querySelector(".open-admin");
        this.updateCatButton = document.querySelector(".update-cat");
        //init
        this.renderButtons();
        this.renderCat();
        this.events();
    },
    
    renderButtons: () =>{
        this.buttons.innerHTML= null;
        for (let item of model.cats){
            let button = document.createElement("BUTTON");
            button.textContent = item.name;
            this.buttons.appendChild(button);   
            button.addEventListener("click", (function(changeCat) {
                return function() {
                    controller.update(changeCat);
                }
            })(item))
        }
    },
    events: function() {
        this.catImage.addEventListener("click", function () {
            controller.clickCount();
        });
        this.admin.addEventListener("click", function () {
            controller.editCat();
            view.adminForm.classList.toggle("hide");
        });
        this.updateCatButton.addEventListener("click", function (){
            controller.updateCat();
        })
    },
    renderCat: function(){
        this.catName.textContent = model.thisCat.name;
        this.catImage.src = model.thisCat.src;
        this.clicks.textContent = model.thisCat.clicks;
    }
};

// controller
let controller = {
    init: function(){
    this.create();
    view.init();
    
    },
    create: function() { 
        for (let item of cats) {
            let cat = new model.Cat(item.name, item.src);
            model.cats.push(cat);
        }
        model.thisCat = model.cats[0];
    },
    update: (cat) => {
        model.thisCat = cat;
        view.renderCat();
        controller.editCat();
    },
    clickCount: function(){
        model.thisCat.clicks++;
        view.renderCat();
    },
    editCat: function(){
        view.newCatName.value = model.thisCat.name;
        view.newCatSrc.value = model.thisCat.src;
        view.newCatClicks.value = model.thisCat.clicks;
    },
    updateCat: function(){
        model.thisCat.name = view.newCatName.value;
        model.thisCat.src = view.newCatSrc.value;
        model.thisCat.clicks = view.newCatClicks.value;
        this.update(model.thisCat);
        view.renderButtons();
    }
}
controller.init();
})();

