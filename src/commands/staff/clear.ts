import { ApplicationCommandOptionType, ApplicationCommandType, GuildMember } from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
    name: "limpar",
    description: "Limpa as mensagens do canal",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "quantidade",
            description: "O total de mensagens que vão ser excluidas",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: "autor",
            description: "Limpar mensagens de apenas um membro",
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
    async run({ interaction, options }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return

        const { channel } = interaction

        await interaction.deferReply({ ephemeral: true })

        const amount = Math.min(options.getInteger("quantidade", true), 100)
        const mention = options.getMember("autor") as GuildMember | null

        if (!channel) {
            interaction.editReply({ content: "Não é possivel limpar mensagens" })
            return
        }

        const messages = await channel.messages.fetch()

        if (mention) {
            const messages = channel.messages.cache.filter(m => m.author.id == mention.id).first(amount)
            if (messages.length < 1) {
                interaction.editReply({ content: `Não foi encontrado nenhuuma mensagem recente de ${mention}` })
            }

            channel.bulkDelete(messages, true).then(cleared => interaction.editReply({
                content: `Foram limpas ${cleared.size} mensagens de ${mention}`
            })).catch((err) => interaction.editReply({
                content: `Ocorreu um erro ao tentar limpar as mensagens de ${mention}! \n ${err}`
            }))

            return
        }

        channel.bulkDelete(messages.first(amount), true).then(cleared => interaction.editReply({
            content: `Foram limpas ${cleared.size} mensagens em ${channel}`
        })).catch((err) => interaction.editReply({
            content: `Ocorreu um erro ao tentar limpar mensagens em ${channel}! \n ${err}`
        }))
    },
})