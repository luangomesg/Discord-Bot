import { Command } from "../../structs/types/Command";
import { TextChannel } from "discord.js";

export default new Command({
    name: "monitorar",
    description: "Monitoring a channel and reply to a specific message.",
    async run({ interaction }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;

        const { channel } = interaction;

        if (!channel || !(channel instanceof TextChannel)) {
            interaction.reply({ content: "Este comando só pode ser usado em canais de texto.", ephemeral: true });
            return;
        }

        interaction.reply({ content: `Monitorando o canal ${channel.name} para uma mensagem especifica.`, ephemeral: true });

        const mensagens = ["oi", "minecraft", "mirage", "f", "🤝"]; // Altere para as mensagens que você quer monitorar
        const respostasBot = ["Olá 😊", "PRA VO CÊ, QUAL A MELHOR FARM DO MINECRAFT", "Dois dias", "F", "🤝"]; // Altere para as respostas correspondentes

        // Crie um listener de eventos para monitorar mensagens nesse canal
        channel.client.on('messageCreate', (message) => {
            // Verifica se a mensagem é de um bot para evitar loops
            if (message.author.bot) return;

            // Converte a mensagem recebida para minúsculas
            const mensagemRecebida = message.content.toLowerCase();

            // Verifica se a mensagem está na lista de mensagens monitoradas
            const index = mensagens.indexOf(mensagemRecebida);

            // Se a mensagem está na lista, envia a resposta correspondente
            if (index !== -1) {
                message.reply(respostasBot[index]);
            }
        });
    },
});
