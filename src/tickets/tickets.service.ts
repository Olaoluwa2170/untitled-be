import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import * as bwipjs from 'bwip-js';
import { loadSync } from 'text-to-svg';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  // UTILITIES

  generateSVG(text: string) {
    const textToSVG = loadSync(
      './src/assets/Dancing_Script/DancingScript-Bold.ttf',
    );
    try {
      const svg = textToSVG.getSVG(text, {
        fontSize: 110,
        anchor: 'top',
        attributes: { fill: 'white', stroke: 'black' },
      });
      return Buffer.from(svg);
    } catch (err) {
      console.log(err);
    }
  }
  async generateQRCode(text: string) {
    const qrcodeBuffer = await bwipjs.toBuffer({
      bcid: 'qrcode',
      text,
      scale: 5,
      textcolor: 'ffffff',
    });
    return qrcodeBuffer;
  }

  generateBarcode(text: string) {
    const svg = bwipjs.toSVG({
      bcid: 'code128',
      text,
      width: 80,
      textxalign: 'center',
      textcolor: 'ff0000',
      rotate: 'L',
    });
    return Buffer.from(svg);
  }

  // SERVICES

  async getUserTickets(userId: string) {
    const tickets = await this.prisma.ticket.findMany({
      where: {
        userId,
      },
    });
    return tickets;
  }

  async createTicket(
    customerName: string,
    ticketId: string,
    outputPath: string,
  ) {
    const ticket = sharp(
      './src/tickets/imageFile/Black and White Minimalist Ticket Music Party (1).png',
    );

    try {
      const barcodeImageBuffer = await this.generateBarcode(ticketId);

      // Generate customer name for ticket as buffer
      const customerNameImageBuffer = await this.generateSVG(customerName);

      const qrcodeImageBuffer = await this.generateQRCode(ticketId);
      const qrCodeOverlay = {
        input: qrcodeImageBuffer,
        top: 220, // X position for QR code
        left: 330, // Y position for QR code
      };

      const barcodeOverlay = {
        input: barcodeImageBuffer,
        // left: 1427,
        left: 1500,
        // top: 210,
        top: 115,
      };

      // Params to overlay SVG onto the template
      const svgOverlay = {
        input: customerNameImageBuffer,
        top: 256,
        left: 637,
      };

      await ticket
        .composite([barcodeOverlay, qrCodeOverlay, svgOverlay])
        .toFile(outputPath);
    } catch (error) {
      console.log(error);
    }
  }
}
