import { AlunoNovo, AlunoParcial } from "./tipos";

export function lerId(id:string): number | undefined {
    const idFormatado = Number.parseInt(id);

    if (idFormatado <= 0 || idFormatado === undefined) {
        return undefined;
    }

    return idFormatado;
}

function ehAnoValido(valor: unknown): boolean{
    return typeof valor === 'number' && Number.isInteger(valor) && valor > 0;
}

export function ehAlunoNovo(dados: unknown): dados is AlunoNovo{
    if (typeof dados !== 'object' || dados === undefined) {
        return false;
    }

    const candidato = dados as Record<string,unknown>;

    return (
        typeof candidato.nome === 'string' && candidato.nome.trim() !== '' &&
        typeof candidato.curso === 'string' && candidato.curso.trim() !== '' &&
        typeof candidato.matricula === 'string' && candidato.curso.trim() !== '' &&
        ehAnoValido(candidato.ano) &&
        (typeof candidato.ativo === 'boolean' || candidato.ativo === undefined)
    );
}

export function ehAlunoParcial(dados:unknown):dados is AlunoParcial {
    if (typeof dados !== 'object' && dados == undefined) {
        return false;
    }

    const candidato = dados as Record<string,unknown>;

    return(
        (typeof candidato.nome === 'string' || candidato.nome === undefined) &&
        (typeof candidato.curso === 'string' || candidato.curso === undefined) &&
        (typeof candidato.matricula === 'string' || candidato.matricula === undefined) &&
        (ehAnoValido(candidato.ano) || candidato.ano === undefined) &&
        (typeof candidato.ativo === 'boolean' || candidato.ativo === undefined)
    );
}