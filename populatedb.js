#! /usr/bin/env node

const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith("mongodb+srv")) {
  console.log(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
  return;
}

const async = require("async");

const Gun = require("./models/gun");
const Maker = require("./models/maker");
const Specs = require("./models/specs");
const Type = require("./models/type");

const guns = [];
const makers = [];
const specs = [];
const types = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: about to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: connected");
 
  await createMakers();
  await createSpecs();
  await createTypes();
 await createGuns();

  console.log("Debug: about to disconnect");
  mongoose.connection.close();
  console.log("Debug: disconnected");
}

async function gunCreate(
  index,
  gun_name,
  gun_type,
  gun_description,
  gun_price,
  gun_specs,
  gun_maker,
  gun_image,
  gun_stock,
  gun_sold
) {
  gundetail = {
    gun_name: gun_name,
    gun_type: gun_type,
    gun_description: gun_description,
    gun_price: gun_price,
    gun_specs: gun_specs,
    gun_maker: gun_maker,
    gun_image: gun_image,
    gun_stock: gun_stock,
    gun_sold: gun_sold,
  };
  const gun = new Gun(gundetail);
  await gun.save();
  guns[index] = gun;
  console.log("New Gun: " + gun);
}
async function makerCreate(index, maker_name, maker_description, maker_image) {
    console.log(`Debug: Creating Maker ${index}`);
    console.log(`maker_image: ${maker_image}`); // Log the maker_image value
    makerdetail = {
      maker_name: maker_name,
      maker_description: maker_description,
      maker_image: maker_image,
    };
    const maker = new Maker(makerdetail);
    try {
      await maker.save();
      makers[index] = maker;
      console.log("New Maker: " + maker);
    } catch (error) {
      console.error("Error saving Maker:", error);
    }
  }

async function specsCreate(
  index,
  specs_atk_power,
  specs_impact,
  specs_rounds,
  specs_weight,
  specs_en
) {
  specsdetail = {
    specs_atk_power: specs_atk_power,
    specs_impact: specs_impact,
    specs_rounds: specs_rounds,
    specs_weight: specs_weight,
    specs_en: specs_en,
  };
  const spec = new Specs(specsdetail);
  await spec.save();
  specs[index] = spec;
  console.log("New Specs: " + spec);
}

async function typeCreate(index, type_name, type_description, type_image) {
  typedetail = {
    type_name: type_name,
    type_description: type_description,
  };
  const type = new Type(typedetail);
  await type.save();
  types[index] = type;
  console.log("New Type: " + type);
}

async function createGuns() {
  console.log("Creating Guns");
  await Promise.all([
    gunCreate(
      0,
      "HG-003 COQUILLETT",
      types[0],
      "Large-caliber handgun developed by Balm. The rise of Core Theory introduced a new kind of close-quarters combat and with it a reappraisal of handguns, which demonstrate stopping power with tremendous impact potential.",
      35000,
      specs[0],
      makers[2],
      "https://armoredcore6.wiki.fextralife.com/file/Armored-Core-6/hg-003-coquillett-arm-unit-armored-core-6-wiki-guide-257px.png",
      10,
      0
    ),
    gunCreate(
      1,
      "DF-GA-08 HU-BEN",
      types[0],
      "Gatling gun developed by Dafeng Core Industries. Equipped with overwhelming rapid-fire performance and sustained firepower, it embodies the 'domination through material superiority' mantra of Dafend's parent company, Balam.",
      170000,
      specs[1],
      makers[2],
      "https://armoredcore6.wiki.fextralife.com/file/Armored-Core-6/df-ga-08-hu-ben-arm-unit-armored-core-6-wiki-guide-257px.png",
      5,
      0
    ),
    gunCreate(
      2,
      "WB-0000 BAD COOK",
      types[2],
      "Flamethrower developed by RaD. A weaponized form of a tool used to melt down scrap at ultra-high temperatures. Continued use at point-blank range is enough to outstrip an AC's antithermal defenses.",
      40000,
      specs[2],
      makers[3],
      "https://armoredcore6.wiki.fextralife.com/file/Armored-Core-6/wb-0000-bad-cook-unit-armored-core-6-wiki-guide-257px.png",
      15,
      0
    ),
    gunCreate(
      3,
      "VP-66LR",
      types[1],
      "Laser rifle developed by Arquebus. One of the most commonly-used laser weapons on the battlefield, this is a flagship product for the corporation. Can be charged to amplify its power.",
      98000,
      specs[3],
      makers[1],
      "https://armoredcore6.wiki.fextralife.com/file/Armored-Core-6/vp-66lr-arm-unit-armored-core-6-wiki-guide-257px.png",
      10,
      0
    ),
    gunCreate(
      4,
      "44-141 JVLN ALPHA",
      types[2],
      "Special bazooka developed by ALLMIND. Creates a chain of explosions on contact that layer on impact damage. Compared to standard explosive weapons, this weapon has notably high direct hit damage.",
      120000,
      specs[4],
      makers[0],
      "https://armoredcore6.wiki.fextralife.com/file/Armored-Core-6/44-141-jvln-alpha-arm-unit-armored-core-6-wiki-guide-257px.png",
      17,
      0
    ),
    gunCreate(
      5,
      "WR-0777 SWEET SIXTEEN",
      types[0],
      "Special shotgun developed by RaD. Strictly speaking, this unique weapon is not a true shotgun, as its area attacks are enabled by firing individual projectiles from multiple barrels simultaneously.",
      49000,
      specs[5],
      makers[3],
      "https://armoredcore6.wiki.fextralife.com/file/Armored-Core-6/wr-0777-sweet-sixteen-arm-unit-armored-core-6-wiki-guide-257px.png",
      20,
      0
    ),
    gunCreate(
      6,
      "IA-C01W6: NB-Redshift",
      types[1],
      "Experimental weapon developed long ago by the Rubicon Research Institute. Manipulates Coral swarm intelligence using energy to produce chain explosions. Charging the weapon increases the number of these explosions.",
      300000,
      specs[6],
      makers[4],
      "https://samurai-gamers.com/wp-content/uploads/2023/08/Armored-Core-6-Fires-of-Rubicon-IA-C01W6-NB-Redshift.jpg",
      12,
      0
    ),
    gunCreate(
      7,
      "44-142 KRSV",
      types[1],
      "Multi Energy Rifle developed by ALLMIND. Capable of laser, plasma and combined fire, this weapon is equipped with a two-stage charge system that provides a choice of firing modes.",
      377000,
      specs[7],
      makers[0],
      "https://static.wikia.nocookie.net/armoredcore/images/5/56/40_-_44-142_KRSV.png/revision/latest/scale-to-width-down/250?cb=20230908222500",
      10,
      0
    ),
    gunCreate(
      8,
      "IB-C03W1: WLT 011",
      types[1],
      "Prototype Coral beam weapon developed long ago by the Rubicon Research Institute. Manipulates Coral swarm intelligence using energy to adjust shape/directionality of the beam. Two-stage charge allows for finely tuned control.",
      335000,
      specs[8],
      makers[4],
      "https://static.wikia.nocookie.net/armoredcore/images/9/98/39_-_IB-C03W1_WLT_011.png/revision/latest/scale-to-width-down/250?cb=20230908222500",
      10,
      0
    ),
  ]);
}

async function createMakers() {
  console.log("Creating Makers");
  await Promise.all([
    makerCreate(
      0,
      "ALLMIND",
      "ALLMIND (オールマインド) is a mercenary liaison organization and weapons manufacturer",
      "./public/images/makers/ALLMIND.png"
    ),
    makerCreate(
      1,
      "Arquebus Corporation",
      "Arquebus Corporation (アーキバス・コーポレーション) is a manufacturer of Armored Core parts in ARMORED CORE VI FIRES OF RUBICON. Among their assets include an elite mercenary squadron, codenamed Vespers and their subsidiary, Schneider, which also manufactures AC parts and schematics. They are a major faction in the planet Rubicon 3.",
      "https://static.wikia.nocookie.net/armoredcore/images/7/73/Emblem_ACVI_Arquebus_Corporation.png/revision/latest/scale-to-width-down/180?cb=20230907114022"
    ),
    makerCreate(
      2,
      "Balams Industries",
      "Balam Industries is a manufacturer of Armored Core parts in ARMORED CORE VI FIRES OF RUBICON. Their motto is, 'Domination through material superiority.' They are one of the major corporations on Rubicon 3, with their power enforced by their in-house mercenary company the Redguns.",
      "https://static.wikia.nocookie.net/armoredcore/images/7/74/Emblem_ACVI_Balam_Industries.png/revision/latest/scale-to-width-down/180?cb=20230907113947"
    ),
    makerCreate(
      3,
      "RaD",
      "Reuse and Development (aka RaD) is a black market arms dealer organization in ARMORED CORE VI FIRES OF RUBICON. They have a reputation for viciousness, and are known for assembling and selling their own heavily customized mechs made from the products of other manufacturers, such as BAWS.",
      "https://static.wikia.nocookie.net/armoredcore/images/e/e9/Emblem_ACVI_RaD.png"
    ),
    makerCreate(
      4,
      "Rubicon Research Institute",
      "The Rubicon Research Institute is an organization in ARMORED CORE VI FIRES OF RUBICON. They were manufacturers of highly advanced technology powered by Rubicon 3's Coral. It became defunct 50 years before the game, when the Fires of Ibis devastated Rubicon. They also created the C-Weapons and the Ibis Series, powerful unmanned machines and Armored Cores that weaponized Coral to deadly results. Other than their Coral-based technology, the RRI also manufactured Light Wave weaponry, which combined laser and pulse technology to fire energy projectiles.",
      "https://static.wikia.nocookie.net/armoredcore/images/3/3f/Emblem_ACVI_Rubicon_Research_Institute.png/revision/latest/scale-to-width-down/180?cb=20230907121037"
    ),
  ]);
}

async function createTypes() {
  console.log("Creating Types");
  await Promise.all([
    typeCreate(
      0,
      "Kinetic",
      "Kinetic Weapons can be thought of as “traditional weapons” that use bullets like those of the real world. A more common name might be Ballistic Weapons. They fire non-explosive rounds that deal damage via high-velocity impacts."
    ),
    typeCreate(
      1,
      "Energy",
      "Energy type ammunition is a slightly more powerful, more convenient type of ammunition that discharges energy in the form of concentrated blasts of energy or lasers whose intense heat can easily tear through enemies. Although each weapon has a preset reserve of finite power, it takes energy from the AC in order to operate at full power. Because energy weapons do not utilize rounds or magazines, there is no need to pay for refills, as they recharge after a battle, thus making them cost-efficient, although they're relatively costly to purchase. "
    ),
    typeCreate(
      2,
      "Explosive",
      "In direct comparison, Explosive Weapons deal the most damage, therefore it is best to use them in boss battles or tough situations. Not only that, but they have a high recoil which means moving and shooting will probably cause less accuracy and increase your chances of missing the target. So it is best to use them while you are stationary."
    ),
  ]);
}

async function createSpecs() {
  console.log("creating Specs");
  await Promise.all([
    specsCreate(0, 166, 235, 105, 1200, 122),
    specsCreate(1, 25, 25, 1300, 5800, 425),
    specsCreate(2, 85, 3, 1200, 6210, 403),
    specsCreate(3, 256, 105, 280, 3560, 480),
    specsCreate(4, 1075, 1390, 44, 7420, 299),
    specsCreate(5, 1105, 793, 546, 1640, 268),
    specsCreate(6, 765, 188, 500, 4040, 667),
    specsCreate(7, 312, 112, 80, 10120, 707),
    specsCreate(8, 405, 152, 180, 9030, 850),
  ]);
}
