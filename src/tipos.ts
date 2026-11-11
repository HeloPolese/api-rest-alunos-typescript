export interface Aluno{
    readonly id: number;
    nome: string;
    curso:string;
    matricula: string;
    ano: number;
    ativo: boolean;
}

export type AlunoNovo = Omit<Aluno,'id'>;

export type AlunoParcial = Partial<AlunoNovo>;

export enum StatusHttp{
    ok = 200,
    criado = 201,
    semConteudo = 204,
    requisicaoMalFormatada = 400,
    naoEncontrado = 404,
    metodoNaoPermitido = 405,
    entidadeNaoProcessavel = 422
}