import { transporter } from "../../../config/smtp";
import { IMailProvider, IMessage } from "../IMailProvider";

export class MailProvider implements IMailProvider {
  async sendMail(message: IMessage): Promise<void> {
    await transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
