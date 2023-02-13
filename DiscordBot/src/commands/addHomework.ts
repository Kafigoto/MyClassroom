import axios from "axios";
import {
  SlashCommandBuilder,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { getSubjectClosestDay } from "../utils/getSubjectClosestDay";

export = {
  data: new SlashCommandBuilder()
    .setName("deverdecasa")
    .setDescription("Adiciona um dever de casa!")
    .addStringOption((option) =>
      option
        .setName("materia")
        .setDescription("Matéria do dever")
        .setRequired(true)
        .addChoices(
          { name: "Português", value: "portuguese" },
          { name: "Matemática", value: "math" },
          { name: "Física", value: "physics" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("paginas")
        .setDescription("Páginas do dever SEPARADAS POR VÍRGULA.")
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    let options = interaction.options;

    let subject;
    let pages;
    let deadline;

    if (options instanceof CommandInteractionOptionResolver) {
      subject = options.getString("materia");
      pages = options.getString("paginas");
    }

    if (subject) deadline = getSubjectClosestDay(subject);

    let requestOptions = {
      method: "POST",
      url: "http://localhost:3000/assignments",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      // TEMPORARY DEADLINE FOR FUCKS SAKE REMOVE THAT.
      data: {
        assignmentType: "HOMEWORK",
        deadline: deadline,
        subject: subject,
        pages: pages,
      },
    };
    try {
      let response = await axios(requestOptions);
    } catch (error) {
      console.error(error);
    }

    await interaction.reply("Dever de casa enviado!");
  },
};