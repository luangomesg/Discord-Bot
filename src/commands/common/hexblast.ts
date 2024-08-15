import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection } from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
    name: "hexblast",
    description: "return a hexblast build to 3.25",
    type: ApplicationCommandType.ChatInput,
    run({ interaction }) {

        const button = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({ url: "https://pobb.in/yEp-sdHqe9eA", label: "Trickster", style: ButtonStyle.Link }),
                new ButtonBuilder({ url: "https://pobb.in/Q0l9RrrBJcLD", label: "Saboteur", style: ButtonStyle.Link }),
                new ButtonBuilder({ url: "https://poe.ninja/builds/settlers/character/Sexo_Assado/CURSE_YOU_BAYLE?type=exp&i=0&search=name%3Dcurse_you", label: "Malpo-T17", style: ButtonStyle.Link }),
                new ButtonBuilder({ url: "https://poe.ninja/builds/settlers/character/Sexo_Assado/CURSE_YOU_BAYLE?type=exp&i=0&search=name%3Dcurse_you&timemachine=week-2", label: "Malpo-Sanctum", style: ButtonStyle.Link })
            ]

        })

        interaction.reply({ ephemeral: false, components: [button] })


    }

})