import { useState } from "react";
import { toast } from "sonner";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formatCNPJ = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

const Index = () => {
  const [unidadeEscolar, setUnidadeEscolar] = useState("");
  const [programa, setPrograma] = useState("");
  const [presidente, setPresidente] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [processo, setProcesso] = useState("");

  const handleExport = () => {
    if (!unidadeEscolar || !programa || !presidente || !cnpj || !processo) {
      toast.error("Preencha todos os campos antes de gerar o documento.");
      return;
    }

    const dataAtual = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const conteudoWord = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Despachos</title></head>
      <body style="font-family: Arial, sans-serif; font-size: 12pt;">
        <h3 style="text-align: center;">DESPACHO 01</h3>
        <p><strong>ENCAMINHAMENTO DE PRESTAÇÃO DE CONTAS (${programa})<br>REF. CONTÁBIL/2025</strong></p>
        <p>À GAD/4ª CRE,</p>
        <p>Encaminho a Prestação de Contas referente aos recursos do Programa FNDE/${programa}, executados pelo Conselho Escola Comunidade (CEC) da <strong>${unidadeEscolar}</strong>, inscrito no CNPJ sob o nº <strong>${cnpj}</strong>, neste ato representado por sua presidente, <strong>${presidente}</strong>.</p>
        <p>Declaro, para os devidos fins, que os documentos anexados a este expediente conferem com os originais apresentados.</p>
        <p>Rio de Janeiro, ${dataAtual}</p>
        <br clear=all style='mso-special-character:line-break;page-break-before:always'>
        <h3 style="text-align: center;">DESPACHO 02</h3>
        <p><strong>PRESTAÇÃO DE CONTAS DE PDDE<br>ANÁLISE PELA GAD – REF. CONTÁBIL/2025</strong></p>
        <p>À Coordenadora da 4ª CRE,</p>
        <p>Trata-se da análise da Prestação de Contas (FNDE/${programa}) encaminhada pelo Conselho Escola Comunidade (CEC) da <strong>${unidadeEscolar}</strong> (CNPJ: <strong>${cnpj}</strong>), representado por <strong>${presidente}</strong>.</p>
        <p>Após análise por esta GAD (Gerência de Administração), constata-se que a documentação apresentada atende integralmente às normatizações e orientações vigentes do FNDE aplicáveis à matéria.</p>
        <p>Diante do exposto, encaminho os autos com parecer favorável à aprovação das contas supracitadas.</p>
        <p>Rio de Janeiro, ${dataAtual}<br>
        <strong>BIANCA BARRETO DA FONSECA COELHO</strong><br>
        Gerente II<br>
        E/4ªCRE/GAD<br>
        Matrícula: 1993567</p>
        <br clear=all style='mso-special-character:line-break;page-break-before:always'>
        <h3 style="text-align: center;">DESPACHO 03</h3>
        <p><strong>PRESTAÇÃO DE CONTAS DE PDDE<br>APROVAÇÃO E PUBLICAÇÃO - REF. CONTÁBIL/2025</strong></p>
        <p>Processo nº ${processo}</p>
        <p>Com fulcro na análise técnica exarada pela Gerência, APROVO a Prestação de Contas referente aos recursos do Programa Dinheiro Direto na Escola (FNDE/${programa}), executados pelo Conselho Escola Comunidade (CEC) da <strong>${unidadeEscolar}</strong> (CNPJ: <strong>${cnpj}</strong>), neste ato representado por sua presidente, <strong>${presidente}</strong>.</p>
        <p>PUBLIQUE-SE.</p>
        <p>Rio de Janeiro, ${dataAtual}<br>
        <strong>FÁTIMA DAS GRAÇAS LIMA BARROS</strong><br>
        Coordenadora I<br>
        E/4ª CRE<br>
        Matrícula: 2025591</p>
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", conteudoWord], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Despachos_${unidadeEscolar.replace(/\s+/g, "_")}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setUnidadeEscolar("");
    setPrograma("");
    setPresidente("");
    setCnpj("");
    setProcesso("");

    toast.success("Despachos gerados com sucesso!");
  };

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-primary py-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl">
          Gerador de Despachos — Prestação de Contas
        </h1>
        <p className="mt-1 text-sm text-primary-foreground/70">
          E/4ª CRE — Rio de Janeiro
        </p>
      </header>

      {/* Form */}
      <main className="mx-auto max-w-2xl px-4 py-10">
        <Card className="shadow-md">
          <CardContent className="space-y-5 pt-6">
            <div className="space-y-1.5">
              <Label htmlFor="unidade">Unidade Escolar</Label>
              <Input
                id="unidade"
                placeholder="Ex: Escola Municipal Carlos Chagas"
                value={unidadeEscolar}
                onChange={(e) => setUnidadeEscolar(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="programa">Programa</Label>
              <Select value={programa} onValueChange={setPrograma}>
                <SelectTrigger id="programa">
                  <SelectValue placeholder="Selecione o programa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDDE BÁSICO/2025">PDDE BÁSICO/2025</SelectItem>
                  <SelectItem value="PDDE QUALIDADE">PDDE QUALIDADE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="presidente">Nome do(a) Presidente do CEC</Label>
              <Input
                id="presidente"
                placeholder="Nome completo"
                value={presidente}
                onChange={(e) => setPresidente(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="processo">Processo SEI</Label>
              <Input
                id="processo"
                placeholder="Ex: 000704.XXXXXX/2026-XX"
                value={processo}
                onChange={(e) => setProcesso(e.target.value)}
              />
            </div>

            <Button className="w-full gap-2 text-base" size="lg" onClick={handleExport}>
              <FileDown className="h-5 w-5" />
              Gerar e Baixar Word
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
