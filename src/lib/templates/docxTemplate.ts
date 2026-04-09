import { Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak } from "docx";
import { saveAs } from "file-saver";

export interface DespachoData {
  unidadeEscolar: string;
  programa: string;
  presidente: string;
  cnpj: string;
  processo: string;
}

export const generateDespachoDocx = async (data: DespachoData) => {
  const { unidadeEscolar, programa, presidente, cnpj, processo } = data;

  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const doc = new Document({
    creator: "Despacho Express",
    title: "Despachos - Prestação de Contas",
    styles: {
      default: {
        document: {
          run: {
            size: 24, // 12pt (half-points in docx)
            font: "Arial", // Standard for official documents
          },
          paragraph: {
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              line: 360, // 1.5 line spacing (240 is 1, 360 is 1.5 in twips)
              after: 200,
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: [
          // =================== DESPACHO 01 ===================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `ENCAMINHAMENTO DE PRESTAÇÃO DE CONTAS (${programa})`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "REF. CONTÁBIL/2025",
                bold: true,
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
             text: "À GAD/4ª CRE,",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Encaminho a Prestação de Contas referente aos recursos do Programa FNDE/${programa}, executados pelo Conselho Escola Comunidade (CEC) da `,
              }),
              new TextRun({
                text: unidadeEscolar,
                bold: true,
              }),
              new TextRun({
                text: ", inscrito no CNPJ sob o nº ",
              }),
              new TextRun({
                text: cnpj,
                bold: true,
              }),
              new TextRun({
                text: ", neste ato representado por seu presidente, ",
              }),
              new TextRun({
                text: presidente,
                bold: true,
              }),
              new TextRun({ text: "." }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            text: "Declaro, para os devidos fins, que os documentos anexados a este expediente conferem com os originais apresentados.",
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            text: `Rio de Janeiro, ${dataAtual}`,
          }),
          
          new Paragraph({
            children: [new PageBreak()], // Quebra de página 1
          }),

          // =================== DESPACHO 02 ===================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "PRESTAÇÃO DE CONTAS DE PDDE",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "ANÁLISE PELA GAD – REF. CONTÁBIL/2025",
                bold: true,
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
             text: "À Coordenadora da 4ª CRE,",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Trata-se da análise da Prestação de Contas (FNDE/${programa}) encaminhada pelo Conselho Escola Comunidade (CEC) da `,
              }),
              new TextRun({
                text: unidadeEscolar,
                bold: true,
              }),
              new TextRun({
                text: " (CNPJ: ",
              }),
              new TextRun({
                text: cnpj,
                bold: true,
              }),
              new TextRun({
                text: "), representado por ",
              }),
              new TextRun({
                text: presidente,
                bold: true,
              }),
              new TextRun({ text: "." }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
             text: "Após análise por esta GAD (Gerência de Administração), constata-se que a documentação apresentada atende integralmente às normatizações e orientações vigentes do FNDE aplicáveis à matéria.",
             alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
             text: "Diante do exposto, encaminho os autos com parecer favorável à aprovação das contas supracitadas.",
             alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({ text: "" }), // Espaçamento
          new Paragraph({
             alignment: AlignmentType.CENTER,
             text: `Rio de Janeiro, ${dataAtual}`,
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "BIANCA BARRETO DA FONSECA COELHO", bold: true }),
            ],
          }),
          new Paragraph({
             alignment: AlignmentType.CENTER,
             text: "Gerente II"
          }),
          new Paragraph({
             alignment: AlignmentType.CENTER,
             text: "E/4ªCRE/GAD"
          }),
          new Paragraph({
             alignment: AlignmentType.CENTER,
             text: "Matrícula: 1993567"
          }),

          new Paragraph({
            children: [new PageBreak()], // Quebra de página 2
          }),

          // =================== DESPACHO 03 ===================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "PRESTAÇÃO DE CONTAS DE PDDE",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "APROVAÇÃO E PUBLICAÇÃO - REF. CONTÁBIL/2025",
                bold: true,
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
             text: `Processo nº ${processo}`,
             alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Com fulcro na análise técnica exarada pela Gerência, APROVO a Prestação de Contas referente aos recursos do Programa Dinheiro Direto na Escola (FNDE/",
              }),
              new TextRun({ text: `${programa}), executados pelo Conselho Escola Comunidade (CEC) da `}),
              new TextRun({
                text: unidadeEscolar,
                bold: true,
              }),
              new TextRun({
                text: " (CNPJ: ",
              }),
              new TextRun({
                text: cnpj,
                bold: true,
              }),
              new TextRun({
                text: "), neste ato representado por sua presidente, ", // As requested. Wait, they put "neste ato representado por sua presidente, Wilson malafaia Peixoto." In Despacho 01 it was "seu presidente". I'll use exactly whatever the user supplied. Wait, I should probably stick to just "presidente," to be gender neutral if it's dynamic? Actually the user input "sua presidente," in Despacho 03 and "seu presidente," in Despacho 01 in the prompt. Let's use exactly what they put: 'seu presidente' in 1, 'sua presidente' in 3, just to be strictly faithful. Or better: "seo(a) presidente" to avoid gender clashes since the input is dynamic. Let's use: "seu(ua) presidente,". The user example is specific to Wilson. I'll use "seu(a) presidente".
              }),
              new TextRun({
                text: presidente,
                bold: true,
              }),
              new TextRun({ text: "." }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),
          
          new Paragraph({ text: "" }),
          new Paragraph({
             alignment: AlignmentType.CENTER,
             children: [
               new TextRun({ text: "PUBLIQUE-SE.", bold: true }),
             ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            text: `Rio de Janeiro, ${dataAtual}`,
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "FÁTIMA DAS GRAÇAS LIMA BARROS", bold: true }),
            ],
          }),
          new Paragraph({
             alignment: AlignmentType.CENTER,
             text: "Coordenadora I"
          }),
          new Paragraph({
             alignment: AlignmentType.CENTER,
             text: "E/4ª CRE"
          }),
          new Paragraph({
             alignment: AlignmentType.CENTER,
             text: "Matrícula: 2025591"
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `Despachos_${unidadeEscolar.replace(/\s+/g, "_")}.docx`;
  saveAs(blob, fileName);
};
