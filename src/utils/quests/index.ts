import { readFile } from "fs/promises";
import { dirname, join } from "path";

export const createQuest = async () => {
  const currentDir = dirname(dirname(__dirname));
  const filePath = join(currentDir, "assets/data/captions.json");
  const data = await readFile(filePath, "utf8");
  const jsonData = JSON.parse(data);
  // randomize
  const properties = Object.keys(jsonData);

  const newQuests: any = [];

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * properties.length);

    //extract category information
    const propertyName = properties[randomIndex];

    //extract random caption from category
    const propertyValue = jsonData[propertyName];
    const randomvalue = Math.floor(Math.random() * propertyValue.length);

    const caption = propertyValue[randomvalue];

    const description =
      "Find an image of a " + caption + " and upload to complete the quest!";

    const randomQuest = {
      category: propertyName,
      description: description,
      caption: caption,
      completed: false,
    };
    newQuests.push(randomQuest);
  }
  return newQuests;
};
