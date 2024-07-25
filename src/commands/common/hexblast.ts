import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection } from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
    name: "hexblast",
    description: "return a hexblast build to 3.25",
    type: ApplicationCommandType.ChatInput,
    run({ interaction }) {

        const row = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({ customId: "Trickster", label: "Trickster", style: ButtonStyle.Success }),
                new ButtonBuilder({ customId: "Saboteur", label: "Saboteur", style: ButtonStyle.Success })
            ]

        })

        interaction.reply({ ephemeral: false, components: [row] })


    },
    buttons: new Collection([
        ["Trickster", async (interaction) => {
            interaction.reply({ ephemeral: false, content: "https://pobb.in/yEp-sdHqe9eA" })
        }],
        ["Saboteur", async (interaction) => {
            interaction.reply({ ephemeral: false, content: "https://pobb.in/Q0l9RrrBJcLD" })
        }]
    ])

})