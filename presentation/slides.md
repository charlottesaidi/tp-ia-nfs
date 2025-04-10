---
theme: seriph
background: https://images.unsplash.com/photo-1548407260-da850faa41e3?q=80&w=1827&auto=format&fit=crop
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## TP Intelligence Artificielle
  Présentation du projet de reconnaissance d'images avec TensorFlow et React
drawings:
  persist: false
transition: slide-left
mdc: true
colorSchema: 'dark'
layout: cover
---

# TP Intelligence Artificielle

## Reconnaissance d'images

<div class="pt-12">
  <span class="px-2 py-1 rounded bg-orange-600 text-white">
    Avril 2025
  </span>
</div>

---
layout: center
---

# Sommaire

<div class="grid grid-cols-2 gap-4">
  <div>
    <ol class="space-y-4 text-left">
      <li class="flex items-center">
        <div class="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">1</div>
        <div>Répartition du travail et organisation</div>
      </li>
      <li class="flex items-center">
        <div class="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">2</div>
        <div>Type d'apprentissage et algorithmes utilisés par TensorFlow</div>
      </li>
      <li class="flex items-center">
        <div class="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">3</div>
        <div>Comment une machine reconnaît-elle une image?</div>
      </li>
    </ol>
  </div>
  <div>
    <ol start="4" class="space-y-4 text-left">
      <li class="flex items-center">
        <div class="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">4</div>
        <div>Présentation de la solution</div>
      </li>
      <li class="flex items-center">
        <div class="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">5</div>
        <div>Contraintes et réussites</div>
      </li>
      <li class="flex items-center">
        <div class="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">6</div>
        <div>Questions / Réponses</div>
      </li>
    </ol>
  </div>
</div>

---
layout: section
---

# Répartition du travail et organisation

---
layout: two-cols
---

# Notre équipe

<div class="flex flex-col items-center justify-center h-full">
  <div class="mb-8 p-6 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl shadow-xl w-64 text-center">
    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" class="w-20 h-20 mx-auto mb-4" />
    <div class="text-2xl font-bold">Antoine</div>
    <div class="mt-2 text-sm opacity-75">Configuration MongoDB Atlas<br/>DevOps<br/>Documentation</div>
  </div>
</div>

::right::

<div class="flex flex-col items-center justify-center h-full gap-8">
  <div class="p-6 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl shadow-xl w-64 text-center">
    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" class="w-20 h-20 mx-auto mb-4" />
    <div class="text-2xl font-bold">Charlotte</div>
    <div class="mt-2 text-sm opacity-75">Interface utilisateur React<br/>Intégration TensorFlow.js</div>
  </div>
  
  <div class="p-6 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl shadow-xl w-64 text-center">
    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" class="w-20 h-20 mx-auto mb-4" />
    <div class="text-2xl font-bold">Saïd</div>
    <div class="mt-2 text-sm opacity-75">Architecture backend<br/>API REST<br/>Modèle de données</div>
  </div>
</div>

---
layout: default
---

# Organisation du travail

<div class="grid grid-cols-2 gap-10 mt-10">
<div class="bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-xl">

## Outils utilisés

<ul class="space-y-4 mt-4">
  <li class="flex items-start">
    <div class="mt-1 mr-3 text-orange-400 text-xl">📊</div>
    <div>
      <div class="font-bold">GitHub</div>
      <div class="text-sm opacity-75">Versionnement, Pull Requests, Issues</div>
    </div>
  </li>
  <li class="flex items-start">
    <div class="mt-1 mr-3 text-orange-400 text-xl">💬</div>
    <div>
      <div class="font-bold">Discord</div>
      <div class="text-sm opacity-75">Communication en temps réel</div>
    </div>
  </li>
  <li class="flex items-start">
    <div class="mt-1 mr-3 text-orange-400 text-xl">📝</div>
    <div>
      <div class="font-bold">Trello</div>
      <div class="text-sm opacity-75">Suivi des tâches, méthodologie Agile</div>
    </div>
  </li>
</ul>

</div>

<div class="bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-xl">

## Méthodologie

<ul class="space-y-4 mt-4">
  <li class="flex items-start">
    <div class="mt-1 mr-3 text-orange-400 text-xl">🔄</div>
    <div>
      <div class="font-bold">Sprints hebdomadaires</div>
      <div class="text-sm opacity-75">Organisation Agile avec des cycles courts</div>
    </div>
  </li>
  <li class="flex items-start">
    <div class="mt-1 mr-3 text-orange-400 text-xl">👥</div>
    <div>
      <div class="font-bold">Code Review</div>
      <div class="text-sm opacity-75">Validation par les pairs avant merge</div>
    </div>
  </li>
  <li class="flex items-start">
    <div class="mt-1 mr-3 text-orange-400 text-xl">🔍</div>
    <div>
      <div class="font-bold">Tests</div>
      <div class="text-sm opacity-75">Tests unitaires et d'intégration</div>
    </div>
  </li>
</ul>

</div>
</div>

---
layout: section
---

# Type d'apprentissage et algorithmes utilisés par TensorFlow

---
layout: default
---

# Types d'apprentissage pris en charge

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="p-4 bg-gray-800 rounded-lg shadow-lg border-l-4 border-orange-500">
    <h3 class="text-lg font-bold mb-1">Apprentissage supervisé</h3>
    <p class="text-sm">Données étiquetées: classification, régression</p>
  </div>
  
  <div class="p-4 bg-gray-800 rounded-lg shadow-lg border-l-4 border-blue-500">
    <h3 class="text-lg font-bold mb-1">Apprentissage non supervisé</h3>
    <p class="text-sm">Patterns sans étiquettes: clustering</p>
  </div>
  
  <div class="p-4 bg-gray-800 rounded-lg shadow-lg border-l-4 border-green-500">
    <h3 class="text-lg font-bold mb-1">Apprentissage par renforcement</h3>
    <p class="text-sm">Apprentissage par récompenses/pénalités</p>
  </div>
  
  <div class="p-4 bg-gray-800 rounded-lg shadow-lg border-l-4 border-purple-500">
    <h3 class="text-lg font-bold mb-1">Apprentissage par transfert</h3>
    <p class="text-sm">Réutilisation de modèles pré-entraînés</p>
  </div>
</div>

---
layout: default
---

# Algorithmes et modèles principaux

<div class="grid grid-cols-3 gap-4 mt-5">
  <div class="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md">
    <div class="text-xl font-bold mb-2 text-orange-400">Réseaux de neurones profonds</div>
    <ul class="ml-4 text-sm list-disc space-y-1">
      <li>MLP (Multi-Layer Perceptron)</li>
      <li>CNN (Convolutional Neural Networks)</li>
      <li>RNN, LSTM, GRU (Recurrent Neural Networks)</li>
    </ul>
  </div>
  
  <div class="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md">
    <div class="text-xl font-bold mb-2 text-orange-400">Transformers</div>
    <ul class="ml-4 text-sm list-disc space-y-1">
      <li>Mécanismes d'attention</li>
      <li>Encodeurs-décodeurs</li>
      <li>BERT, GPT (NLP)</li>
      <li>ViT (Vision Transformer)</li>
    </ul>
  </div>
  
  <div class="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md">
    <div class="text-xl font-bold mb-2 text-orange-400">AutoEncoders</div>
    <ul class="ml-4 text-sm list-disc space-y-1">
      <li>VAE (Variational AutoEncoders)</li>
      <li>Encodeurs pour la réduction de dimensionnalité</li>
      <li>Débruitage et reconstruction</li>
    </ul>
  </div>
  
  <div class="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md">
    <div class="text-xl font-bold mb-2 text-orange-400">GAN</div>
    <ul class="ml-4 text-sm list-disc space-y-1">
      <li>Génération d'images</li>
      <li>Synthèse de données</li>
      <li>StyleGAN, CycleGAN</li>
    </ul>
  </div>
  
  <div class="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md">
    <div class="text-xl font-bold mb-2 text-orange-400">Algorithmes de gradient</div>
    <ul class="ml-4 text-sm list-disc space-y-1">
      <li>SGD (Stochastic Gradient Descent)</li>
      <li>Adam, RMSProp</li>
      <li>Adagrad, Adadelta</li>
    </ul>
  </div>
  
  <div class="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md">
    <div class="text-xl font-bold mb-2 text-orange-400">Modèles spécifiques</div>
    <ul class="ml-4 text-sm list-disc space-y-1">
      <li>MobileNet (pour appareils mobiles)</li>
      <li>EfficientNet (scaling optimal)</li>
      <li>ResNet (réseaux résiduels)</li>
    </ul>
  </div>
</div>

---
layout: section
---

# Comment une machine reconnaît-elle une image ?

---
layout: two-cols
---

# Processus de reconnaissance d'image

<div class="mt-2 space-y-3">
  <div class="p-2 bg-gradient-to-r from-orange-900 to-orange-700 rounded-lg flex items-center">
    <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-lg font-bold mr-2">1</div>
    <div>
      <div class="font-bold">Prétraitement</div>
      <div class="text-xs opacity-80">Redimensionnement, normalisation</div>
    </div>
  </div>
  
  <div class="p-2 bg-gradient-to-r from-orange-800 to-orange-600 rounded-lg flex items-center">
    <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-lg font-bold mr-2">2</div>
    <div>
      <div class="font-bold">Extraction de caractéristiques</div>
      <div class="text-xs opacity-80">Convolutions pour détection de motifs</div>
    </div>
  </div>
  
  <div class="p-2 bg-gradient-to-r from-orange-700 to-orange-500 rounded-lg flex items-center">
    <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-lg font-bold mr-2">3</div>
    <div>
      <div class="font-bold">Pooling</div>
      <div class="text-xs opacity-80">Réduction de dimensions</div>
    </div>
  </div>
  
  <div class="p-2 bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg flex items-center">
    <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-lg font-bold mr-2">4</div>
    <div>
      <div class="font-bold">Classification</div>
      <div class="text-xs opacity-80">Couches fully-connected, softmax</div>
    </div>
  </div>
</div>

::right::

<div class="pl-4">
  <h3 class="text-xl font-bold mb-2 text-orange-400">Architecture CNN</h3>
  
  <div class="bg-gray-700 rounded-lg p-3 mb-4">
    <img src="https://developers.google.com/static/machine-learning/crash-course/images/ConvolutionalNeuralNetworkCells.png" class="rounded-lg shadow-xl mb-4 w-full h-auto" />
  </div>
  
  <div class="bg-gray-800 p-3 rounded-lg">
    <div class="text-sm font-bold mb-1">Avantages des CNN</div>
    <ul class="space-y-1 text-xs">
      <li class="flex items-start">
        <span class="text-orange-500 mr-1">✓</span> Extraction automatique des caractéristiques
      </li>
      <li class="flex items-start">
        <span class="text-orange-500 mr-1">✓</span> Partage de paramètres (efficacité)
      </li>
      <li class="flex items-start">
        <span class="text-orange-500 mr-1">✓</span> Robustesse aux translations
      </li>
    </ul>
  </div>
</div>

---
layout: image-right
image: https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2019/08/01/cnn-layers.jpg
---

# Fonctionnement détaillé

<div class="grid gap-4 mt-4">
<div>

## Couches principales
- **Convolution**: filtres détectant les motifs
- **Pooling**: réduction des dimensions
- **Couches connectées**: classification finale

</div>
<div>

## Processus d'analyse
- Extraction progressive des caractéristiques
- Hiérarchie de motifs (arêtes → formes → objets)
- Rétropropagation pour l'apprentissage

</div>
</div>

<div class="mt-4 mb-2 bg-gray-800 bg-opacity-50 p-3 rounded-lg text-sm">
L'optimisation par gradients permet d'ajuster les poids pour minimiser l'erreur entre la prédiction et la réalité.
</div>

---
layout: section
---

# Présentation de la solution

---
layout: center
---

# Notre solution

<div class="grid grid-cols-2 gap-2">
<div>
  <div class="p-3 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg mb-3">
    <h3 class="text-lg font-bold flex items-center">
      <div class="text-orange-400 mr-2">🖥️</div> Frontend (React)
    </h3>
    <p class="text-xs">Interface responsive, TensorFlow.js, MobileNet</p>
  </div>
  
  <div class="p-3 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg mb-3">
    <h3 class="text-lg font-bold flex items-center">
      <div class="text-orange-400 mr-2">⚙️</div> Backend (Node.js)
    </h3>
    <p class="text-xs">API REST, stockage des analyses</p>
  </div>
</div>

<div>
  
  <div class="p-3 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg mb-3">
    <h3 class="text-lg font-bold flex items-center">
      <div class="text-orange-400 mr-2">🗄️</div> Base de données
    </h3>
    <p class="text-xs">MongoDB Atlas, schéma flexible NoSQL</p>
  </div>
  
  <div class="bg-gray-800 rounded-lg p-3">
    <h3 class="text-lg font-bold text-orange-400">Fonctionnalités</h3>
    <ul class="text-xs space-y-1">
      <li class="flex items-center">
        <div class="text-orange-500 mr-1">✓</div>
        <div>Upload et analyse d'images</div>
      </li>
      <li class="flex items-center">
        <div class="text-orange-500 mr-1">✓</div>
        <div>Classification en temps réel</div>
      </li>
      <li class="flex items-center">
        <div class="text-orange-500 mr-1">✓</div>
        <div>Historique et statistiques</div>
      </li>
    </ul>
  </div>
</div>
</div>

---
layout: center
---

# Démonstration de l'application

---
layout: section
---

# Contraintes et réussites

---
layout: center
---

# Défis rencontrés

<div class="grid grid-cols-2 gap-4">
<div>
  <div class="p-3 bg-red-900 bg-opacity-30 rounded-lg border border-red-700">
    <h3 class="font-bold text-lg mb-1 text-red-400">Challenges techniques</h3>
    <ul class="text-xs space-y-1">
      <li class="flex items-start">
        <div class="text-red-400 mt-0.5 mr-1">⚠️</div>
        <div>Intégration TensorFlow.js dans React</div>
      </li>
      <li class="flex items-start">
        <div class="text-red-400 mt-0.5 mr-1">⚠️</div>
        <div>Performance et optimisation</div>
      </li>
      <li class="flex items-start">
        <div class="text-red-400 mt-0.5 mr-1">⚠️</div>
        <div>Gestion des formats incompatibles</div>
      </li>
    </ul>
  </div>
  
  <div class="p-3 bg-orange-900 bg-opacity-30 rounded-lg border border-orange-700 mt-3">
    <h3 class="font-bold text-lg mb-1 text-orange-400">Limitations</h3>
    <ul class="text-xs space-y-1">
      <li class="flex items-start">
        <div class="text-orange-400 mt-0.5 mr-1">⚠️</div>
        <div>Classification limitée (1000 classes)</div>
      </li>
      <li class="flex items-start">
        <div class="text-orange-400 mt-0.5 mr-1">⚠️</div>
        <div>Pas de détection multi-objets</div>
      </li>
    </ul>
  </div>
</div>

<div>
  <div class="p-3 bg-green-900 bg-opacity-30 rounded-lg border border-green-700">
    <h3 class="font-bold text-lg mb-1 text-green-400">Réussites</h3>
    <ul class="text-xs space-y-1">
      <li class="flex items-start">
        <div class="text-green-400 mt-0.5 mr-1">✓</div>
        <div>Application fonctionnelle end-to-end</div>
      </li>
      <li class="flex items-start">
        <div class="text-green-400 mt-0.5 mr-1">✓</div>
        <div>Interface intuitive et responsive</div>
      </li>
      <li class="flex items-start">
        <div class="text-green-400 mt-0.5 mr-1">✓</div>
        <div>Classification en temps réel</div>
      </li>
      <li class="flex items-start">
        <div class="text-green-400 mt-0.5 mr-1">✓</div>
        <div>Persistance MongoDB Atlas</div>
      </li>
    </ul>
  </div>
  
  <div class="mt-3 w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center p-2">
    <div class="text-center">
      <div class="text-4xl text-orange-500 font-bold">82%</div>
      <div class="text-sm text-orange-300 font-semibold">Taux de précision</div>
      <div class="text-xs opacity-70">Sur 200 images testées</div>
    </div>
  </div>
</div>
</div>

---
layout: center
class: "text-center"
---

# Améliorations futures

<div class="grid grid-cols-3 gap-8 mt-10">
  <div class="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl transform transition-all hover:scale-105">
    <div class="text-4xl mb-4 mx-auto">📷</div>
    <h3 class="text-xl font-bold mb-2">Support Webcam</h3>
    <p class="text-sm opacity-80">Analyse d'images en direct depuis la caméra</p>
  </div>
  
  <div class="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl transform transition-all hover:scale-105">
    <div class="text-4xl mb-4 mx-auto">🔍</div>
    <h3 class="text-xl font-bold mb-2">Détection multi-objets</h3>
    <p class="text-sm opacity-80">Identifier plusieurs éléments dans une même image</p>
  </div>
  
  <div class="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl transform transition-all hover:scale-105">
    <div class="text-4xl mb-4 mx-auto">📊</div>
    <h3 class="text-xl font-bold mb-2">Statistiques avancées</h3>
    <p class="text-sm opacity-80">Visualisation des données d'analyse</p>
  </div>
  
  <div class="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl transform transition-all hover:scale-105">
    <div class="text-4xl mb-4 mx-auto">📱</div>
    <h3 class="text-xl font-bold mb-2">Application mobile</h3>
    <p class="text-sm opacity-80">Version native pour iOS et Android</p>
  </div>
  
  <div class="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl transform transition-all hover:scale-105">
    <div class="text-4xl mb-4 mx-auto">🔄</div>
    <h3 class="text-xl font-bold mb-2">Fine-tuning</h3>
    <p class="text-sm opacity-80">Adaptation du modèle à des domaines spécifiques</p>
  </div>
  
  <div class="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl transform transition-all hover:scale-105">
    <div class="text-4xl mb-4 mx-auto">🌐</div>
    <h3 class="text-xl font-bold mb-2">API publique</h3>
    <p class="text-sm opacity-80">Service de reconnaissance accessible via API</p>
  </div>
</div>

---
layout: center
class: "text-center"
---

# Questions / Réponses

<div class="flex flex-col items-center justify-center h-80">
  <div class="text-3xl font-bold mb-10">Merci pour votre attention !</div>
  <div class="text-xl">Des questions ?</div>
</div>

---
layout: end
---
