import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
import { Button, Container } from "@radix-ui/themes";



export function CreateCounter({ onCreated }: { onCreated: (id: string) => void; }) {
    const counterPackageId = useNetworkVariable("counterPackageId");
    const suiClient = useSuiClient();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction({
        execute: async ({ bytes, signature}) => {
            console.debug("bytes is ", bytes);
            return await suiClient.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                    showRawEffects: true,
                    showEffects: true
                }
            })
        }
            
        }
    );
    return (
        <Container>
            <Button size="3" onClick={() => {
                create();
            }}>
            Create Counter
            </Button>
        </Container>
    )

    function create() {
        const tx = new Transaction();
        console.debug("tx is " , tx);
        tx.moveCall({
            arguments: [],
            target: `${counterPackageId}::counter::create`,
        });
        signAndExecute({
            transaction: tx
        }, {
            onSuccess: (result) => {
                const objectId = result?.effects?.created?.[0]?.reference?.objectId;
                console.debug("objectId is", objectId);
                if (objectId) {
                    onCreated(objectId);
                }
            },
            onError: (error) => {
                console.debug("error is ", error);
            }
        })
    }
}

