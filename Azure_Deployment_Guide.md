# Průvodce nasazením na Azure

Tento dokument vás provede kroky potřebnými k nahrání webu na GitHub a jeho následnému hostování na Azure Static Web Apps.

## Krok 1: Nahrání na GitHub

1. Přihlaste se na svůj [GitHub účet](https://github.com/).
2. Vpravo nahoře klikněte na **+** -> **New repository**.
3. Pojmenujte repozitář (např. `vlasac-web`) a klikněte na **Create repository**.
4. V terminálu ve složce projektu spusťte následující příkazy (nahraďte URL svým repozitářem):

```bash
git remote add origin https://github.com/vase-jmeno/vlasac-web.git
git branch -M main
git push -u origin main
```

## Krok 2: Vytvoření Azure Static Web App

1. Přihlaste se do [Azure Portálu](https://portal.azure.com/).
2. Vyhledejte **'Static Web Apps'** a klikněte na **Create**.
3. Vyberte své předplatné a skupinu prostředků (Resource Group).
4. Do pole **Name** napište `vlasac-web`.
5. V sekci **Deployment details** vyberte **GitHub** jako zdroj.
6. Přihlaste se ke svému GitHubu a vyberte vytvořený repozitář a větev `main`.
7. V sekci **Build Details** nechte **Build Presets** na **'Custom'**:
   - **App location**: `/`
   - **Api location**: (nechte prázdné)
   - **Output location**: `/`
8. Klikněte na **Review + create** a poté **Create**.

Azure automaticky vytvoří GitHub Action, která při každém dalším pushnutí do větve `main` web znovu nasadí.

## Krok 3: Kontrola webu
Po dokončení nasazení najdete URL adresu svého nového webu v přehledu (Overview) Static Web App v Azure Portálu.
