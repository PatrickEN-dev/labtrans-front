import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Users, Coffee, FileText, Target, Sparkles } from "lucide-react";
import type { Manager } from "@/lib/mock-data";

interface BookingAdditionalConfigProps {
  form: any;
  managers: Manager[];
}

export function BookingAdditionalConfig({ form, managers }: BookingAdditionalConfigProps) {
  const { setValue, watch, register } = form;
  const managerId = watch("managerId");
  const hasRefreshments = watch("hasRefreshments");
  const refreshmentQuantity = watch("refreshmentQuantity");

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-linear-to-br from-white to-slate-50/50">
      <CardHeader className="pb-4 bg-linear-to-r from-orange-50 to-amber-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-linear-to-br from-orange-500 to-amber-600 rounded-lg shadow-lg">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="bg-linear-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent font-bold">
              Detalhes da Reunião
            </span>
            <p className="text-sm text-slate-500 font-normal mt-1">
              Configure as informações principais
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-6">
          <Label
            htmlFor="name"
            className="text-sm font-semibold text-slate-700 flex items-center gap-2"
          >
            <FileText className="h-4 w-4 text-blue-600" />
            Nome da Reunião *
          </Label>
          <Input
            id="name"
            placeholder="Ex: Reunião de Planejamento Estratégico Q4"
            {...register("name")}
            className="mt-1 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-11 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-sm font-semibold text-slate-700 flex items-center gap-2"
          >
            <Target className="h-4 w-4 text-green-600" />
            Descrição Detalhada
          </Label>
          <Textarea
            id="description"
            placeholder="Descreva os objetivos, pauta principal e resultados esperados desta reunião..."
            {...register("description")}
            className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white resize-none h-20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              Responsável *
            </Label>
            <Select value={managerId} onValueChange={(value) => setValue("managerId", value)}>
              <SelectTrigger className="mt-1 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 h-11 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white">
                <SelectValue placeholder="Selecione o responsável" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-slate-200">
                {managers.map((manager) => (
                  <SelectItem key={manager.id} value={manager.id} className="hover:bg-purple-50">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">{manager.name}</div>
                        <div className="text-xs text-slate-500">{manager.email}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="purpose"
              className="text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Categoria
            </Label>
            <Select value={watch("purpose")} onValueChange={(value) => setValue("purpose", value)}>
              <SelectTrigger className="mt-1 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 h-11 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white">
                <SelectValue placeholder="Selecione o tipo de reunião" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-slate-200">
                <SelectItem value="planejamento" className="hover:bg-indigo-50">
                  📋 Reunião de Planejamento
                </SelectItem>
                <SelectItem value="workshop" className="hover:bg-indigo-50">
                  🔧 Workshop/Treinamento
                </SelectItem>
                <SelectItem value="apresentacao" className="hover:bg-indigo-50">
                  📊 Apresentação
                </SelectItem>
                <SelectItem value="brainstorm" className="hover:bg-indigo-50">
                  💡 Brainstorming
                </SelectItem>
                <SelectItem value="review" className="hover:bg-indigo-50">
                  🔍 Review/Retrospectiva
                </SelectItem>
                <SelectItem value="entrevista" className="hover:bg-indigo-50">
                  👥 Entrevista
                </SelectItem>
                <SelectItem value="outro" className="hover:bg-indigo-50">
                  📝 Outro
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-linear-to-br from-amber-500 to-orange-600 rounded-lg shadow-md">
                <Coffee className="h-5 w-5 text-white" />
              </div>
              <div>
                <Label
                  htmlFor="hasRefreshments"
                  className="text-base font-semibold text-slate-700 cursor-pointer"
                >
                  Coffee Break Especial
                </Label>
                <p className="text-sm text-slate-500 mt-1">
                  Adicione um toque especial à sua reunião
                </p>
              </div>
            </div>
            <Checkbox
              id="hasRefreshments"
              checked={hasRefreshments}
              onCheckedChange={(checked) => setValue("hasRefreshments", Boolean(checked))}
              className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600 w-5 h-5"
            />
          </div>

          {hasRefreshments && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-amber-200/50">
              <div className="space-y-2">
                <Label
                  htmlFor="refreshmentQuantity"
                  className="text-sm font-semibold text-slate-700"
                >
                  👥 Quantidade de pessoas *
                </Label>
                <Input
                  id="refreshmentQuantity"
                  type="number"
                  min="1"
                  max="50"
                  value={refreshmentQuantity || ""}
                  onChange={(e) => setValue("refreshmentQuantity", parseInt(e.target.value) || 0)}
                  placeholder="Ex: 12"
                  className="h-11 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="refreshmentDescription"
                  className="text-sm font-semibold text-slate-700"
                >
                  ☕ Preferências especiais
                </Label>
                <Input
                  id="refreshmentDescription"
                  placeholder="Ex: Café premium, chás variados, biscoitos..."
                  {...register("refreshmentDescription")}
                  className="h-11 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
