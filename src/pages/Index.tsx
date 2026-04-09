import { useState } from "react";
import { toast } from "sonner";
import { FileDown } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { generateDespachoDocx } from "@/lib/templates/docxTemplate";

const formatCNPJ = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

const formatProcessoSei = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{6})(\d)/, "$1.$2")
    .replace(/^(\d{6})\.(\d{6})(\d)/, "$1.$2/$3")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

const formSchema = z.object({
  unidadeEscolar: z.string().min(1, "Campo obrigatório"),
  programa: z.string().min(1, "Selecione o programa"),
  presidente: z.string().min(1, "Campo obrigatório"),
  cnpj: z.string().min(18, "CNPJ incompleto"),
  processo: z.string().min(19, "Processo incompleto"),
});

type FormData = z.infer<typeof formSchema>;

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { control, handleSubmit, register, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unidadeEscolar: "",
      programa: "",
      presidente: "",
      cnpj: "",
      processo: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsGenerating(true);
      await generateDespachoDocx(data);
      toast.success("Despachos gerados com sucesso!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar o documento.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleValidationErrors = () => {
    toast.error("Preencha todos os campos corretamente antes de gerar o documento.");
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <header className="bg-primary py-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl">
          Gerador de Despachos — Prestação de Contas
        </h1>
        <p className="mt-1 text-sm text-primary-foreground/70">
          E/4ª CRE — Rio de Janeiro
        </p>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10">
        <Card className="shadow-md">
          <CardContent className="space-y-5 pt-6">
            <form onSubmit={handleSubmit(onSubmit, handleValidationErrors)} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="unidade">Unidade Escolar</Label>
                <Input
                  id="unidade"
                  placeholder="Ex: Escola Municipal Carlos Chagas"
                  {...register("unidadeEscolar")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="programa">Programa</Label>
                <Controller
                  control={control}
                  name="programa"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="programa">
                        <SelectValue placeholder="Selecione o programa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDDE BÁSICO/2025">PDDE BÁSICO/2025</SelectItem>
                        <SelectItem value="PDDE QUALIDADE">PDDE QUALIDADE</SelectItem>
                        <SelectItem value="PDDE EQUIDADE">PDDE EQUIDADE</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="presidente">Nome do(a) Presidente do CEC</Label>
                <Input
                  id="presidente"
                  placeholder="Nome completo"
                  {...register("presidente")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Controller
                  control={control}
                  name="cnpj"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Input
                      {...field}
                      id="cnpj"
                      placeholder="00.000.000/0000-00"
                      value={value}
                      onChange={(e) => onChange(formatCNPJ(e.target.value))}
                    />
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="processo">Processo SEI</Label>
                <Controller
                  control={control}
                  name="processo"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Input
                      {...field}
                      id="processo"
                      placeholder="Ex: 000704.000000/2026-00"
                      value={value}
                      onChange={(e) => onChange(formatProcessoSei(e.target.value))}
                    />
                  )}
                />
              </div>

              <Button 
                className="w-full gap-2 text-base" 
                size="lg" 
                type="submit"
                disabled={isGenerating}
              >
                <FileDown className="h-5 w-5" />
                {isGenerating ? "Gerando..." : "Gerar e Baixar Word Docx"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
