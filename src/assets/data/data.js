export const levelOptions = [
    { value: 0, label: 'any level' },
    { value: 1, label: 'Level 1' },
    { value: 2, label: 'Level 2' },
    { value: 3, label: 'Level 3' },
    { value: 4, label: 'Level 4' },
    { value: 5, label: 'Level 5' },
    { value: 7, label: 'Level 7' },
    { value: 8, label: 'Level 8' },
    { value: 9, label: 'Level 9' },
    { value: 10, label: 'Level 10' },
    { value: 11, label: 'Level 11' },
    { value: 12, label: 'Level 12' },
    { value: 13, label: 'Level 13' },
    { value: 14, label: 'Level 14' },
    { value: 15, label: 'Level 15' },
  ];

  export const typeOptions = [
    { value: "", label: "any Type" },
    { value: "Effect Monster", label: "Effect Monster" },
    { value: "Flip Effect Monster", label: "Flip Effect Monster" },
    { value: "Flip Tuner Effect Monster", label: "Flip Tuner Effect Monster" },
    { value: "Gemini Monster", label: "Gemini Monster" },
    { value: "Normal Monster", label: "Normal Monster" },
    { value: "Normal Tuner Monster", label: "Normal Tuner Monster" },
    { value: "Pendulum Effect Monster", label: "Pendulum Effect Monster" },
    { value: "Pendulum Effect Ritual Monster", label: "Pendulum Effect Ritual Monster" },
    { value: "Pendulum Flip Effect Monster", label: "Pendulum Flip Effect Monster" },
    { value: "Pendulum Normal Monster", label: "Pendulum Normal Monster" },
    { value: "Pendulum Tuner Effect Monster", label: "Pendulum Tuner Effect Monster" },
    { value: "Ritual Effect Monster", label: "Ritual Effect Monster" },
    { value: "Ritual Monster", label: "Ritual Monster" },
    { value: "Spell Card", label: "Spell Card" },
    { value: "Spirit Monster", label: "Spirit Monster" },
    { value: "Toon Monster", label: "Toon Monster" },
    { value: "Trap Card", label: "Trap Card" },
    { value: "Tuner Monster", label: "Tuner Monster" },
    { value: "Union Effect Monster", label: "Union Effect Monster" },
    { value: "Fusion Monster", label: "Fusion Monster" },
    { value: "Link Monster", label: "Link Monster" },
    { value: "Pendulum Effect Fusion Monster", label: "Pendulum Effect Fusion Monster" },
    { value: "Synchro Monster", label: "Synchro Monster" },
    { value: "Synchro Pendulum Effect Monster", label: "Synchro Pendulum Effect Monster" },
    { value: "Synchro Tuner Monster", label: "Synchro Tuner Monster" },
    { value: "XYZ Monster", label: "XYZ Monster" },
    { value: "XYZ Pendulum Effect Monster", label: "XYZ Pendulum Effect Monster" },
    { value: "Skill Card", label: "Skill Card" },
    { value: "Token", label: "Token" },
  ];
  
  export const raceOptions = [
    // Monster Cards
    { value: "", label: "any Race" },
    { value: "Aqua", label: "Aqua" },
    { value: "Beast", label: "Beast" },
    { value: "Beast-Warrior", label: "Beast-Warrior" },
    { value: "Creator-God", label: "Creator-God" },
    { value: "Cyberse", label: "Cyberse" },
    { value: "Dinosaur", label: "Dinosaur" },
    { value: "Divine-Beast", label: "Divine-Beast" },
    { value: "Dragon", label: "Dragon" },
    { value: "Fairy", label: "Fairy" },
    { value: "Fiend", label: "Fiend" },
    { value: "Fish", label: "Fish" },
    { value: "Insect", label: "Insect" },
    { value: "Machine", label: "Machine" },
    { value: "Plant", label: "Plant" },
    { value: "Psychic", label: "Psychic" },
    { value: "Pyro", label: "Pyro" },
    { value: "Reptile", label: "Reptile" },
    { value: "Rock", label: "Rock" },
    { value: "Sea Serpent", label: "Sea Serpent" },
    { value: "Spellcaster", label: "Spellcaster" },
    { value: "Thunder", label: "Thunder" },
    { value: "Warrior", label: "Warrior" },
    { value: "Winged Beast", label: "Winged Beast" },
    { value: "Wyrm", label: "Wyrm" },
    { value: "Zombie", label: "Zombie" },
    
    // Spell Cards
    { value: "Normal Spell", label: "Normal Spell" },
    { value: "Field", label: "Field" },
    { value: "Equip", label: "Equip" },
    { value: "Continuous Spell", label: "Continuous Spell" },
    { value: "Quick-Play", label: "Quick-Play" },
    { value: "Ritual Spell", label: "Ritual Spell" },
  
    // Trap Cards
    { value: "Normal Trap", label: "Normal Trap" },
    { value: "Continuous Trap", label: "Continuous Trap" },
    { value: "Counter", label: "Counter" },
  ];
  
  export const frameOptions = [
    { value: "", label: "any Frame type" },
    { value: "normal", label: "Normal" },
    { value: "effect", label: "Effect" },
    { value: "ritual", label: "Ritual" },
    { value: "fusion", label: "Fusion" },
    { value: "synchro", label: "Synchro" },
    { value: "xyz", label: "XYZ" },
    { value: "link", label: "Link" },
    { value: "normal_pendulum", label: "Normal Pendulum" },
    { value: "effect_pendulum", label: "Effect Pendulum" },
    { value: "ritual_pendulum", label: "Ritual Pendulum" },
    { value: "fusion_pendulum", label: "Fusion Pendulum" },
    { value: "synchro_pendulum", label: "Synchro Pendulum" },
    { value: "xyz_pendulum", label: "XYZ Pendulum" },
    { value: "spell", label: "Spell" },
    { value: "trap", label: "Trap" },
    { value: "token", label: "Token" },
    { value: "skill", label: "Skill" },
  ];
  
  export const attributeOptions = [
    { value: "", label: "any Attribute" },
    { value: "DARK", label: "DARK" },
    { value: "EARTH", label: "EARTH" },
    { value: "FIRE", label: "FIRE" },
    { value: "LIGHT", label: "LIGHT" },
    { value: "WATER", label: "WATER" },
    { value: "WIND", label: "WIND" }
  ];


  export const sortOption = [
    { value: "az", label: "A-Z" },
    { value: "za", label: "Z-A" },
    { value: 1, label: "Old" },
    { value: -1, label: "New" },
  ];
  

  
  export const roleOption = [
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
  ];

  export const tierOption = [
    { value: "Silver", label: "Silverfang" },
    { value: "Blue", label: "Blue-Eyes" },
    { value: "Dragon", label: "The Winged Dragon of Ra" },
  ];
  
