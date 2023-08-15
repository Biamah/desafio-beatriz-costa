import cardapio from "./cardapio";

class CaixaDaLanchonete {
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        const carrinho = this.carrinho(itens);

        if (carrinho !== '') {
            return carrinho;
        }

        const verificaPedido = this.verificaPedido(metodoDePagamento, itens);
        
        if (verificaPedido !== 'Pedido válido!') {
            return verificaPedido;
        }

        const calcPagamento = this.calcPagamento(metodoDePagamento, itens);

        return calcPagamento;
    }

    carrinho(itens) {
        const carrinho = itens.length ? '' : 'Não há itens no carrinho de compra!';
        return carrinho;
    }

    verificaPedido(metodoDePagamento, itens) {
        const formasPagamento = ['dinheiro', 'credito', 'debito'];
        const itensValidos = ['cafe', 'chantily', 'suco', 'sanduiche', 'queijo', 'salgado', 'combo1', 'combo2'];
        const itensExtras = [{
            codigo: 'chantily',
            principal: 'cafe'
        }, {
            codigo: 'queijo',
            principal: 'sanduiche'
        }];
        let erroPagamento = '';


        if (!formasPagamento.includes(metodoDePagamento)) {
            erroPagamento = 'Forma de pagamento inválida!';
        }


        itens.forEach(item => {
            const [codigo, quantidade] = item.split(',');
            
            if (quantidade === '0') {
                erroPagamento = 'Quantidade inválida!';
            } else if (!itensValidos.includes(codigo)) {
                erroPagamento = 'Item inválido!';
            }
            
            const itemExtra = itensExtras.find(i => i.codigo === codigo);
            if (itemExtra) {
                // ['cafe,4', 'sanduiche,3', 'queijo,2']
                // itens.some(i => i.includes(itemExtra.principal)

                if (itens.some(i => i.includes(itemExtra.principal)) === false) {
                    console.log(itens, itemExtra)
                    erroPagamento = `Item extra não pode ser pedido sem o principal`;
                }
            }
        });

        return erroPagamento || 'Pedido válido!';
    }

    calcPagamento(metodoDePagamento, itens) {
        const desconto = 0.05;
        const acrescimo = 0.03;
        let valorFinal = 0;

        itens.forEach(item => {
            const [codigo, quantidade] = item.split(',');
            const {descricao, valor} = cardapio[codigo];

            const valorItem = quantidade * valor;
            const descontoFinal = valorItem * desconto;
            const acrescimoFinal = valorItem * acrescimo;

            if (metodoDePagamento === 'dinheiro') {
                valorFinal += valorItem - descontoFinal;
            }
            
            else if (metodoDePagamento === 'credito') {
                valorFinal += valorItem + acrescimoFinal;
            }
            
            else {
                valorFinal += valorItem;
            }

        });

        const localidade = 'pt-BR';
        const configuracaoMoeda = { style: 'currency', currency: 'BRL' };
        const valorFormatado = new Intl.NumberFormat(localidade, configuracaoMoeda).format(valorFinal);

        return `${valorFormatado}`

    }

}
export { CaixaDaLanchonete };
