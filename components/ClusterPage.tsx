import React, { useEffect, useState } from "react"
import Game from "./Game"
import { Renderer } from "@k8slens/extensions";

const ClusterPage = (): JSX.Element => {

  console.info("🔥 Cluster page rendered");

  const [podsStore] = useState(Renderer.K8sApi.apiManager.getStore(Renderer.K8sApi.podsApi))

  useEffect(() => {
    const ensure = async () => {
      if (!podsStore.isLoaded) {
        await podsStore.loadAll({ namespaces: ["von-neumann"] });
        podsStore.subscribe();
      }
    }
    ensure();
  }, [podsStore])

  return (
    <Renderer.Component.TabLayout>
      <header className="flex gaps align-center">
        <h2 className="flex gaps align-center">
          <span>Space Invaders</span>
        </h2>
        <div className="box right">
          <Renderer.Component.NamespaceSelectFilter />
        </div>
      </header>
      <Game pods={podsStore.items} />
    </Renderer.Component.TabLayout>

  )
}

export default ClusterPage
