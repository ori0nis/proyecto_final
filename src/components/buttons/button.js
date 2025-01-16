import "./button.css";

export const button = (className, img, description) => 
    `
    <button>
        <img class="${className}" src="${img}" alt="${description}"/>
    </button>
`;

export const selectButton = () => 
    `
    <button class="select-button">Select month</button>
`;